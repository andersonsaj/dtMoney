import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {createServer, Model} from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freelanca de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Freelanca de Api',
          type: 'deposit',
          category: 'Dev',
          amount: 5000,
          createdAt: new Date('2021-02-15 07:00:00')
        },
        {
          id: 3,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Moradia',
          amount: 1000,
          createdAt: new Date('2021-02-05 07:00:00')
        },
      ]
  })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transaction', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

