import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';

import Routers from './routers/Routers';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 49,
              horizontalLineHeight: '150%',
              activeBarBorderWidth: 0,
            },
          },
        }}
      >
        <Routers />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
