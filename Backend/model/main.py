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
# from datetime import date, datetime
# from datetime import datetime
# from json import dumps
# from pandas import json_normalize
import datetime
# Loading data using API
input_data_string = sys.argv[1]

# Parse the JSON data into a Python object
input_data = json.loads(input_data_string)
# print(input_data)
energy_arr = input_data['energy']['engy']
day_arr = input_data['energy']['day']
state = input_data['state']
member_no = input_data['members']

print(energy_arr)
print(day_arr)
print(state)
print(member_no)
print(len(energy_arr))
print(len(day_arr))


column_values = ['Date', state]
print("a")

# Calling DataFrame constructor after zipping
# both lists, with columns specified
df_n = pd.DataFrame(list(zip(day_arr, energy_arr)), columns=['Date', state])
# df_n = pd.DataFrame(data=energy_arr, columns=column_values)

print('b')
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

print(df_n)
df_n['Date'] = pd.to_datetime(df_n['Date'])
df_t = df_n.copy()
df_n.set_index('Date', inplace=True)


# Using the population dataset
df_p = pd.read_csv('./model/RBIDATAstates_wise_population_Incomenew.csv')
df_p.set_index('States_Union Territories', inplace=True)
df_n[state] = df_n[state].mul(1000000)
df_n[state] = df_n[state].div(df_p.loc[state][0])


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


prediction_window = 5
x = sliding_windows(scaled_train, prediction_window)
train_size = int(len(train) - prediction_window*3)
X_train = Variable(torch.Tensor(np.array(x[:train_size])))
# print(x)
# print(X_train.shape)


# Predicting
valid_predict = model(X_train)
# print(valid_predict)
y_pred_scaled = valid_predict.data.numpy()
y_pred = scaler.inverse_transform(y_pred_scaled)  # y_pred is the output tensor
# print(y_pred.shape)
# print(y_pred)
y_pred = y_pred * int(member_no)
print(type(y_pred))
print(type(member_no))
print(len(y_pred))


date = df_t['Date'][df_t.shape[0]-1]  # last element of day_arr
new_date = []
for i in range(len(y_pred)):
    date += datetime.timedelta(days=1)
    new_date.append(date.to_pydatetime().strftime("%Y-%m-%d"))
    # print(date)
# new_date
input_data = {"date": new_date, 'energy': y_pred.tolist()}


# json_data = df1['Date'][number:number+len(y_pred)]
# json_data = json_data.astype(str)
# input_data = {"date": json_data.tolist(), 'energy': y_pred.tolist()}


# dumping output to a new json file.
with open('./output.json', 'w') as f:
    json.dump(input_data, f)


print('done')
