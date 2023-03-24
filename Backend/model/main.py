"""Preprocessing the input data"""
import torch
from saveload import LSTMNet
from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error
# import torch.nn as nn
import numpy as np
from torch.autograd import Variable
import pandas as pd
# print(torch.__version__)

EPOCHS = 3000
LEARNING_RATE = 0.001
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'

INPUT_SIZE = 1
HIDDEN_SIZE = 200
NUM_LAYERS = 1
model = LSTMNet(INPUT_SIZE, HIDDEN_SIZE, NUM_LAYERS)
model.load_state_dict(torch.load("../gsc/Backend/model/fina_model.pt"))
criterion = torch.nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)

# print(model.eval())
# for param in model.parameters():
#     print(param)
# preprocessing
# print(model.state_dict())
df1 = pd.read_csv("/Users/harshitarathee/Downloads/archive-2/dataset_tk.csv")
Date = df1.rename({'Unnamed: 0': 'Date'}, axis=1, inplace=True)
df1['Date'] = pd.to_datetime(df1['Date'])
df1 = df1.dropna(axis=1)
df1 = df1.groupby(df1['Date'], as_index=False).mean()
df_n = df1.iloc[:39, 0:2]
df_n['Date'] = pd.to_datetime(df_n['Date'])
df_n.set_index('Date', inplace=True)
# train = [[0.44198442],
#          [0.61500615],
#          [0.68839688],
#          [0.25748257],
#          [0.09061091],
#          [0.63140631],
#          [0.32677327],
#          [0.34112341],
#          [0.34850349],
#          [0.72078721],
#          [0.81057811],
#          [0.73923739],
#          [0.71217712],
#          [0.56949569],
#          [0.61910619],
#          [0.66748667],
#          [0.32759328],
#          [0.31324313],
#          [0.32062321],
#          [0.32718327],
#          [0.34891349],
#          [0.36244362],
#          [0.34235342],
#          [0.01599016],
#          [0.02706027],
#          [0.26158262],
#          [0.03075031],
#          [0.19188192],
#          [0.30217302],
#          [0.26568266],
#          [0.],
#          [0.55883559],
#          [0.78064781],
#          [0.69331693],
#          [0.22468225],
#          [0.10619106],
#          [0.53095531],
#          [0.17507175],
#          [0.19885199]]
# train = np.array(train)
# print(train.shape)
# option to choose the states will have to implemented
# states = ['Punjab', 'Haryana', 'Rajasthan', 'Delhi', 'UP', 'Uttarakhand',
#           'HP', 'J&K', 'Chandigarh', 'Chhattisgarh', 'Gujarat', 'MP',
#           'Maharashtra', 'Goa', 'DNH', 'Andhra Pradesh', 'Telangana',
#           'Karnataka', 'Kerala', 'Tamil Nadu', 'Pondy', 'Bihar', 'Jharkhand',
#           'Odisha', 'West Bengal', 'Sikkim', 'Arunachal Pradesh', 'Assam',
#           'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura']

# int_features = [0] * 3
train = df_n.copy()
scaler = MinMaxScaler()
scaler.fit(train)
scaled_train = scaler.transform(train)


def sliding_windows(data, n_input):
    x_train = []
    # y_train = []
    for i in range(n_input, len(data)):
        x_train.append(data[i-n_input:i])
        # x_train.append(data[i])
    return np.array(x_train)


prediction_window = 12
x = sliding_windows(scaled_train, prediction_window)
train_size = int(len(train) - prediction_window*3)
X_train = Variable(torch.Tensor(np.array(x[:train_size])))
# print(x)
print(X_train.shape)
# input1 = state
# input2 = no of people in the family
# input3 = total power consumption
# print("Model's state_dict:")
# for param_tensor in model.state_dict():
#     print(param_tensor, "\t", model.state_dict()[param_tensor].size())

# Print optimizer's state_dict
# print("Optimizer's state_dict:")
# for var_name in optimizer.state_dict():
#     print(var_name, "\t", optimizer.state_dict()[var_name])
# dataX = Variable(torch.Tensor(np.array(x)))
# inference

valid_predict = model(X_train)
print(valid_predict)
y_pred_scaled = valid_predict.data.numpy()
y_pred = scaler.inverse_transform(y_pred_scaled)
print(y_pred)
