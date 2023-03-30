"""Preprocessing the input data using model 2"""
# import sys
import json
import torch
# from saveload import LSTMNet
from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error
import torch.nn as nn
import numpy as np
# from torch.autograd import Variable
import pandas as pd
from new_model import AirModel
import torch.optim as optim
# import torch.utils.data as data
import matplotlib.pyplot as plt

'''
# Loading data using API
input_data_string = sys.argv[1]
# Parse the JSON data into a Python object
input_data = json.loads(input_data_string)
'''


'''
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
# with open(json_file_path, 'r') as j:
#     contents = json.loads(j.read())
#     print(contents)
'''


#  Preprocessing

# Json to csv conversion
# df = pd.read_json(json_string)
# df.to_csv('file.csv')

df1 = pd.read_csv("/Users/harshitarathee/Downloads/archive-2/dataset_tk.csv")
Date = df1.rename({'Unnamed: 0': 'Date'}, axis=1, inplace=True)
df1['Date'] = pd.to_datetime(df1['Date'])
df1 = df1.dropna(axis=1)
df1 = df1.groupby(df1['Date'], as_index=False).mean()
state = "Haryana"          # INPUT
print(state)
number = 30
df_n = df1.loc[:number, ['Date', state]]
df_n['Date'] = pd.to_datetime(df_n['Date'])
df_n.set_index('Date', inplace=True)
print(df_n)

# Using the population dataset
df_p = pd.read_csv('./model/RBIDATAstates_wise_population_Incomenew.csv')
df_p.set_index('States_Union Territories', inplace=True)
df_n[state] = df_n[state].mul(1000000)
df_n[state] = df_n[state].div(df_p.loc[state][0])
timeseries = df_n[[state]].values.astype('float32')

# Scaling the data
train = df_n.copy()
scaler = MinMaxScaler()
scaler.fit(train)
scaled_train = scaler.transform(train)


# train-test split for time series
train_size = int(len(timeseries) * 0.67)
# test_size = len(timeseries) - train_size
train =  timeseries[:train_size]


def create_dataset(dataset, lookback):
    """Transform a time series into a prediction dataset
    Args:
        dataset: A numpy array of time series, first dimension is the time steps
        lookback: Size of window for prediction
    """
    X = []
    for i in range(len(dataset)-lookback):
        feature = dataset[i:i+lookback]
        # target = dataset[i+1:i+lookback+1]
        X.append(feature)
        # y.append(target)
    return torch.Tensor(X)


lookback = 12

X_train = create_dataset(train, lookback=lookback)
# print(X_train)
# Predicting


model = AirModel()
model.load_state_dict(torch.load("./model/model_new.pt"))
optimizer = optim.Adam(model.parameters())
loss_fn = nn.MSELoss()

y_pred = model(X_train)
# valid_predict = model(X_train)
# print(valid_predict)
# y_pred_scaled = valid_predict.data.numpy()
# y_pred = scaler.inverse_transform(y_pred_scaled)
print(y_pred.shape)
print(y_pred)
input_data = {'energy': y_pred.tolist()}         # y_pred is the  output tensor


# plotting
with torch.no_grad():
    # shift train predictions for plotting
    # train_plot = np.ones_like(timeseries) * np.nan
    # y_pred = model(X_train)
    y_pred = y_pred[:, -1, :]
    # train_plot[lookback:train_size] = model(X_train)[:, -1, :]
    # shift test predictions for plotting
    test_plot = np.ones_like(timeseries) * np.nan
    test_plot[lookback:train_size] = model(X_train)[:, -1, :]

# plt.plot(timeseries)
# plt.plot(train_plot, c='r')
plt.plot(test_plot, c='g')
plt.show()

print(len(y_pred))
json_data = df1['Date'][number:number+len(y_pred)]
json_data = json_data.astype(str)
input_data = {"date": json_data.tolist(), 'energy': y_pred.tolist()}

# dumping output to a new json file.
with open('./output.json', 'w') as f:
    json.dump(input_data, f)


print('done')
