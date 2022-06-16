import { useState } from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const App = () => {
  return (
    <BrowserRouter>
      <h1>My Page</h1>
      <div className="container">
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/Todo`} element={<Todo />} />
          <Route path={`/Profile`} element={<Profile />} />
          <Route path={`/Setting`} element={<Setting />} />
        </Routes>
      </div>
      <footer>
        <small>
          Copyright © 2022- kosuke-kurono Co.,Ltd. All Rights Reserved.
        </small>
      </footer>
    </BrowserRouter>
  );
};
function Todo() {
  const [addText, setAddText] = useState("");
  // 課題一覧を作成
  const [incompleteList, setIncompleteList] = useState(["掃除", "皿洗い"]);
  // 完了一覧を作成
  const [completeList, setCompleteList] = useState(["犬の散歩", "買い物"]);
  const onChangeText = (event: any) => setAddText(event.target.value);

  // 課題一覧に入力された課題を追加する
  const onClickAdd = () => {
    // 未入力時の登録を無効化
    if (addText !== "") {
      const newText = [...incompleteList, addText];
      setIncompleteList(newText);
      setAddText("");
    }
  };
  // 削除ボタン押下
  const onClickDelete = (index: number) => {
    const newText = [...incompleteList];
    newText.splice(index, 1);

    setIncompleteList(newText);
  };
  // 完了ボタン押下
  const onClickComplete = (index: number) => {
    const incompleteText = [...incompleteList];
    incompleteText.splice(index, 1);

    const completeText = [...completeList, incompleteList[index]];
    setIncompleteList(incompleteText);
    setCompleteList(completeText);
  };
  // 課題に戻すボタン押下
  const onClickIncomplete = (index: number) => {
    const completeText = [...completeList];
    completeText.splice(index, 1);

    const incompleteText = [...incompleteList, completeList[index]];
    setCompleteList(completeText);
    setIncompleteList(incompleteText);
  };
  return (
    <div className="container">
      <h2>ToDo</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="入力してください"
          value={addText}
          onChange={onChangeText}
        />
        <button onClick={onClickAdd}>登録</button>
      </div>
      <div className="incomplete box">
        <p>課題</p>
        <ul>
          {incompleteList.map((todo, index) => {
            return (
              <div key={todo} className="list">
                <li>{todo}</li>
                <div>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete box">
        <p>完了</p>
        <ul>
          {completeList.map((todo, index) => {
            return (
              <div key={todo} className="list">
                <li>{todo}</li>
                <button onClick={() => onClickIncomplete(index)}>
                  課題に戻す
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="home">
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </div>
  );
}
function Home() {
  return (
    <>
      <h2>Menu</h2>
      <ul>
        <li className="Menu-Content">
          <Link to={`/Todo/`}>My Todo</Link>
        </li>
        <li className="Menu-Content">
          <Link to={`/Profile/`}>Profile</Link>
        </li>
        <li className="Menu-Content">
          <Link to={`/Setting/`}>Setting</Link>
        </li>
      </ul>
    </>
  );
}
function Profile() {
  return (
    <>
      <h2>Profile</h2>
      <Tabs>
        <TabList>
          <Tab>基本情報</Tab>
          <Tab>職歴</Tab>
          <Tab>一言</Tab>
        </TabList>
        <TabPanel className="tab-p1">
          <h3>名前</h3>
          <p>kosuke</p>
          <h3>生年月日</h3>
          <p>YYYY/MM/DD</p>
          <h3>出身地</h3>
          <p>〇〇県</p>
        </TabPanel>
        <TabPanel>
          <h3>2008~2014</h3>
          <p>接客業</p>
          <h3>2014~2016</h3>
          <p>営業&接客業</p>
          <h3>2016~2018</h3>
          <p>接客業</p>
          <h3>2018~現在</h3>
          <p>IT関連</p>
        </TabPanel>
        <TabPanel>
          <p>頑張る！</p>
        </TabPanel>
      </Tabs>
      <div className="home">
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  );
}
function Setting() {
  return (
    <>
      <h2>Setting</h2>
      <div className="home">
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  );
}

export default App;
