import React, {useState} from 'react';
import {Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import {LoadingOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
const Intro=(React.lazy(()=>import("./pages/index")));
function App() {
  return (
    <div className="App"><Switch>
      <Suspense fallback={<div style={{marginTop:'30vh', textAlign: 'center',}}><LoadingOutlined style={{color:'#6C63FF',fontSize:'100px'}}/></div>}>
        <Route exact path="/" component={Intro}></Route> </Suspense></Switch>
    </div>
  );
}

export default App;
