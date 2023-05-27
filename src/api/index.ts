import axios from "axios";

import MockAdapter from "axios-mock-adapter";

export const api = axios.create({
  baseURL: ""
});

const mock = new MockAdapter(api, {
  delayResponse: 1000
});

mock.onGet("/users", { params: { page: 1 } }).reply(200, {
  results: new Array(20).fill(0).map((_, index) => ({
    id: index,
    name: `Jonh ${index}`
  })),
  hasMore: true
});

mock.onGet("/users", { params: { page: 2 } }).reply(200, {
  results: new Array(20).fill(0).map((_, index) => ({
    id: 50 + index,
    name: `Jonh ${50 + index}`
  })),
  hasMore: true
});

mock.onGet("/users", { params: { page: 3 } }).reply(200, {
  results: new Array(20).fill(0).map((_, index) => ({
    id: 100 + index,
    name: `Jonh ${100 + index}`
  })),
  hasMore: true
});

mock.onGet("/users", { params: { page: 4 } }).reply(200, {
  results: new Array(20).fill(0).map((_, index) => ({
    id: 1000 + index,
    name: `Jonh ${1000 + index}`
  })),
  hasMore: false
});
