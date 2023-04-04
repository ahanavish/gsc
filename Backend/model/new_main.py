"""Preprocessing the input data using model 2"""
import sys
import json
import datetime
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
from new_model import AirModel


# Loading data using API
"""input_data_string = sys.argv[1]
"""
# Parse the JSON data into a Python object
#input_data = json.loads(input_data_string)
# print(input_data)
def func(input_data):
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


    # Calling DataFrame constructor after zipping
    # both lists, with columns specified
    df_n = pd.DataFrame(list(zip(day_arr, energy_arr)), columns=['Date', state])

    print(df_n)
    df_n['Date'] = pd.to_datetime(df_n['Date'])
    df_t = df_n.copy()
    df_n.set_index('Date', inplace=True)


    # Using the population dataset
    # df_p = pd.read_csv('./model/RBIDATAstates_wise_population_Incomenew.csv')
    # df_p.set_index('States_Union Territories', inplace=True)
    # df_n[state] = df_n[state].mul(1000000)
    # df_n[state] = df_n[state].div(df_p.loc[state][0])
    df_n[state] = df_n[state].div(int(member_no))
    timeseries = df_n[[state]].values.astype('float32')


    # Scaling the data
    train = df_n.copy()

    # train-test split for time series
    train_size = int(len(timeseries) * 0.67)
    # test_size = len(timeseries) - train_size
    train = timeseries[:train_size]


    def create_dataset(dataset, lookback):
        """Transform a time series into a prediction dataset
        Args:
            dataset: A numpy array of time series, first dimension is the time steps
            lookback: Size of window for prediction
        """
        X = []
        for i in range(len(dataset)-lookback):
            feature = dataset[i:i+lookback]
            X.append(feature)

        return torch.Tensor(X)


    lookback = 4

    X_train = create_dataset(train, lookback=lookback)
    # print(X_train)

    # model
    model = AirModel()
    model.load_state_dict(torch.load("model_new.pt"))
    optimizer = optim.Adam(model.parameters())
    loss_fn = nn.MSELoss()

    # predicting
    y_pred = model(X_train)
    # valid_predict = model(X_train)
    # print(valid_predict)
    # y_pred_scaled = valid_predict.data.numpy()
    # y_pred = scaler.inverse_transform(y_pred_scaled)
    print(y_pred.shape)
    print(type(y_pred))
    y_pred = y_pred * int(member_no)
    # y_pred is the  output tensor
    print(type(y_pred))
    print(type(member_no))
    print("lne of ypred")
    print(len(y_pred))
    date = df_t['Date'][df_t.shape[0]-1]  # last element of day_arr
    new_date = []
    for i in range(len(y_pred)):
        date += datetime.timedelta(days=1)
        new_date.append(date.to_pydatetime().strftime("%Y-%m-%d"))
        # print(date)
    # new_date


    # formatting
    with torch.no_grad():
        # shift train predictions for plotting
        train_plot = np.ones_like(timeseries) * np.nan
        # y_pred = model(X_train)
        y_pred = y_pred[:, -1, :]
        train_plot[lookback:train_size] = model(X_train)[:, -1, :]
        # shift test predictions for plotting
        # test_plot = np.ones_like(timeseries) * np.nan
        # test_plot[lookback:train_size] = model(X_train)[:, -1, :]
        print(train_plot)
        print(train_plot.shape)
        arr_fin = []
        num = 0
        for i in train_plot:
            if not pd.isna(i[0]):
                arr_fin.append(num)
            num += 1
    # print(arr_fin)
    train_plot = train_plot[arr_fin]
    train_plot = train_plot*int(member_no)
    # print(train_plot)

    input_data = {"date": new_date, 'energy': train_plot.tolist()}
    print(input_data, 'input_data')
    return input_data

'''
# plotting
# plt.plot(timeseries)
# plt.plot(train_plot, c='r')
plt.plot(test_plot, c='g')
plt.show()

'''

# dumping output to a new json file.
"""with open('./output.json', 'w') as f:
    json.dump(input_data, f)"""


    print('done1')
