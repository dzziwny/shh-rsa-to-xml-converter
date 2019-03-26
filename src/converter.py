import base64
import struct
from browser import document

app = document['approot']
def convert_openssh_key_to_xml(event):
    try:
      key = event.detail
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

      xml = _xml_template.format(base64.b64encode(modulus[1:]),
                                  base64.b64encode(exponent)).replace('\t', 4 * ' ')

      app.xml = xml
    except:
      app.xml = 'error!'

app.bind('keyEmiter', convert_openssh_key_to_xml);