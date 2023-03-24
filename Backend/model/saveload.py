"""MOdel class creation"""
import torch
import torch.nn as nn
# import numpy as np
from torch.autograd import Variable
# device = 'cuda' if torch.cuda.is_available() else 'cpu'
# print(torch.__version__)
# print(torch.device)


class LSTMNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers):
        super(LSTMNet, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(
            input_size=input_size, hidden_size=hidden_size,
            num_layers=num_layers, batch_first=True
        )
        self.fc1 = nn.Linear(hidden_size, 40)
        self.fc2 = nn.Linear(40, 1)
        self.relu = nn.ReLU()

    def forward(self, x):
        h0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size))
        c0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size))
        _, (h_out, _) = self.lstm(x, (h0, c0))

        h_out = h_out.view(-1, self.hidden_size)

        out = self.fc2(self.relu(self.fc1(h_out)))
        return out


# EPOCHS = 3000
# LEARNING_RATE = 0.001
# DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'

# INPUT_SIZE = 1
# HIDDEN_SIZE = 200
# NUM_LAYERS = 1
# model = LSTMNet(input_size=1, hidden_size=200, num_layers=1)

# FILE = "model.pth"
# torch.save(model.state_dict(), FILE)
