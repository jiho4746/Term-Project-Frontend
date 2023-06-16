import React from "react";
import { TextField, Table, Button } from "@material-ui/core";

class UIAddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자의 입력을 저장할 오브젝트
    this.add = props.add; //App 컴포넌트로부터 전달받은 add 함수를 할당
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "" } }); //추가 후에는 새로운 item을 넣을 수 있도록 현재 state 객체를 초기화
  };
  //Enter 키 입력 시 아이템 추가
  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.onButtonClick();
    }
  };

  render() {
    return (
        <div>
            제품 정보 추가를 위한 UI 제공
      <Table style={{ margin: 16, padding: 16 }}>
        <tr>
            <td>id : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              id={this.state.item.id}
              onKeyPress={this.enterKeyEventHandler} 
            /></td>
        </tr>
        <tr>
            <td>userId : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              title={this.state.item.title}
              onKeyPress={this.enterKeyEventHandler} 
            /></td>
        </tr>
        <tr>
            <td>done : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              done={this.state.item.done}
              onKeyPress={this.enterKeyEventHandler} 
            /></td>
        </tr> 
        <tr>
            <td>Title : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              userId={this.state.item.userId}
              onKeyPress={this.enterKeyEventHandler} //enterKeyEventHandler를 이벤트 핸들러와 연결
            /></td>
        </tr>  
      </Table>
      <Button
      color="secondary"
      variant="outlined"
      onClick={this.onButtonClick}
    >
      제품 추가
    </Button>
    </div>
    );
  }
}

export default UIAddProduct;
