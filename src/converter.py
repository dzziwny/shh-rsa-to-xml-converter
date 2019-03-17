import base64
import struct
import sys

def convert_openssh_key_to_xml(key, verbose=False):
    """Convert Public Key to XML format for C# usage.

    See http://stackoverflow.com/a/13104466 for details.

    .. code-block: python

        >>> public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDz[...]"
        >>> xml_public_key = convert_openssh_key_to_xml(public_key, verbose=True)
        >>> print(xml_public_key)
        ssh-rsa
        Exponent: 65537 (0x 010001)
        Modulus:  306795311757[...] (0x 00 f3 07 [...])
        <RSAKeyValue>
            <Modulus>8wdY5gj[...]</Modulus>
            <Exponent>AQAB</Exponent>
        </RSAKeyValue>

    Args:
        key (str): The key to be converted.
        verbose (bool): If key content should be printed. Defaults to ``False``.

    Returns:
        str: The XML formatted RSA key.

    """
    _xml_template = "<RSAKeyValue>\n\t<Modulus>{0}</Modulus>\n\t<Exponent>{1}</Exponent>\n</RSAKeyValue>"
    raw = base64.b64decode(key.split(' ')[-1].strip())

    # Read out algorithm
    n_byte_algorithm = struct.unpack(">I", raw[:4])[0]
    algorithm = raw[4:4+n_byte_algorithm]
    offset = 4 + n_byte_algorithm

    # Read out exponent
    n_byte_exponent = struct.unpack(">I", raw[offset:offset + 4])[0]
    offset += 4
    exponent = raw[offset: offset + n_byte_exponent]
    offset += n_byte_exponent

    # Read modulus
    n_byte_modulus = struct.unpack(">I", raw[offset:offset + 4])[0]
    offset += 4
    modulus = raw[offset:offset + n_byte_modulus]
    offset += n_byte_modulus

    if verbose:
        exponent_hex = " ".join(map(lambda x: hex(x)[2:].zfill(2),
                               struct.unpack('{0}B'.format(n_byte_exponent), exponent)))
        modulus_hex = " ".join(map(lambda x: hex(x)[2:].zfill(2),
                               struct.unpack('{0}B'.format(n_byte_modulus), modulus)))
        print(algorithm)
        print("Exponent: {0} (0x {1})".format(int(exponent_hex.replace(' ', ''), 16), exponent_hex.replace(' ', '')))
        print("Modulus:  {0} (0x {1})".format(int(modulus_hex.replace(' ', ''), 16), modulus_hex))

    return _xml_template.format(base64.b64encode(modulus[1:]),
                                base64.b64encode(exponent)).replace('\t', 4 * ' ')

public_key = sys.argv[1]
xml_public_key = convert_openssh_key_to_xml(public_key, verbose=True)
print(xml_public_key)