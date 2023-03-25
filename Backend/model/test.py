import sys
import json

print('hey there')

input_data_string = sys.argv[1]

# Parse the JSON data into a Python object
input_data = json.loads(input_data_string)
# pre processing

with open('./output.json', 'w') as f:
    json.dump(input_data, f)
    
print('done')

