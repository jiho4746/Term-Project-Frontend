import React from "react";
import { TextField, Table, Button } from "@material-ui/core";

class UISearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자의 입력을 저장할 오브젝트
    this.add = props.add; //App 컴포넌트로부터 전달받은 add 함수를 할당
    this.search = props.search; // App 컴포넌트로부터 전달받은 search 함수를 할당
  }

  onInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  onButtonClick = () => {
    this.search(this.state.searchTerm); // search 함수 호출하여 검색 수행
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
            제품 검색을 위한 UI 제공
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
              value={this.state.searchTerm}
              onKeyPress={this.enterKeyEventHandler}
            /></td>
        </tr>  
      </Table>
      <Button
      color="secondary"
      variant="outlined"
      onClick={this.onButtonClick}
    >
      제품 검색
    </Button>
    </div>
    );
  }
}

export default UISearchProduct;
