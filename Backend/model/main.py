"""Preprocessing the input data"""
import sys
import json
import torch
from saveload import LSTMNet
from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error
# import torch.nn as nn
import numpy as np
from torch.autograd import Variable
import pandas as pd


# Loading data


input_data_string = sys.argv[1]

# Parse the JSON data into a Python object
input_data = json.loads(input_data_string)

# response_API = requests.get('http://localhost:8080/inference')
# #print(response_API.status_code)
# # data = response_API.text
# # parse_json = json.loads(data)
# # info = parse_json['description']
# # print("Info about API:\n", info)
# # key = parse_json['date']['engy']
# # print("\nDescription about the key:\n",key)
# response_API.raise_for_status()  # raises exception when not a 2xx response
# if response_API.status_code != 204:
#     print(response_API.json())


# json_file_path = "Backend/output.json"
# 
# with open(json_file_path, 'r') as j:
#     contents = json.loads(j.read())
#     print(contents)


EPOCHS = 3000
LEARNING_RATE = 0.001
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
INPUT_SIZE = 1
HIDDEN_SIZE = 200
NUM_LAYERS = 1
model = LSTMNet(INPUT_SIZE, HIDDEN_SIZE, NUM_LAYERS)
model.load_state_dict(torch.load("./model/fina_model.pt"))
criterion = torch.nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)


# INPUT VALUES
# input1 = state
# input2 = no of people in the family
# input3 = total power consumption

# option to choose the states will have to implemented
# states = ['Punjab', 'Haryana', 'Rajasthan', 'Delhi', 'UP', 'Uttarakhand',
#           'HP', 'J&K', 'Chandigarh', 'Chhattisgarh', 'Gujarat', 'MP',
#           'Maharashtra', 'Goa', 'DNH', 'Andhra Pradesh', 'Telangana',
#           'Karnataka', 'Kerala', 'Tamil Nadu', 'Pondy', 'Bihar', 'Jharkhand',
#           'Odisha', 'West Bengal', 'Sikkim', 'Arunachal Pradesh', 'Assam',
#           'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura']


#  Preprocessing

# Json to csv conversion
# df = pd.read_json(json_string)
# df.to_csv('file.csv')

df1 = pd.read_csv("/Users/harshitarathee/Downloads/archive-2/dataset_tk.csv")
Date = df1.rename({'Unnamed: 0': 'Date'}, axis=1, inplace=True)
df1['Date'] = pd.to_datetime(df1['Date'])
df1 = df1.dropna(axis=1)
df1 = df1.groupby(df1['Date'], as_index=False).mean()
state = "J&K"
print(state)
df_n = df1.loc[:10, ['Date', state]]
df_n['Date'] = pd.to_datetime(df_n['Date'])
df_n.set_index('Date', inplace=True)

# train = np.array(train)
# print(train.shape)


# Scaling the data
train = df_n.copy()
scaler = MinMaxScaler()
scaler.fit(train)
scaled_train = scaler.transform(train)


# Creating the sliding window funtion
def sliding_windows(data, n_input):
    x_train = []
    # y_train = []
    for i in range(n_input, len(data)):
        x_train.append(data[i-n_input:i])
        # y_train.append(data[i])
    return np.array(x_train)


prediction_window = 3
x = sliding_windows(scaled_train, prediction_window)
train_size = int(len(train) - prediction_window*3)
X_train = Variable(torch.Tensor(np.array(x[:train_size])))
# print(x)
print(X_train.shape)


# Predicting
valid_predict = model(X_train)
# print(valid_predict)
y_pred_scaled = valid_predict.data.numpy()
y_pred = scaler.inverse_transform(y_pred_scaled)
print(y_pred.shape)
print(y_pred)
input_data = {'energy': y_pred.tolist()}
# y_pred is the  output tensor

# dumping output to a new json file.
with open('./model/new.json', 'w') as f:
    json.dump(input_data, f)

print('done')

