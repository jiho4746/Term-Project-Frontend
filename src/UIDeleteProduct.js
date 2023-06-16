import React from "react";
import { TextField, Table, Button } from "@material-ui/core";

class UIDeleteProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자의 입력을 저장할 오브젝트
    this.remove = props.remove;
  }

  onInputChange = (e) => {
    const item = { title: e.target.value };
    this.setState({ item });
  };

  onButtonClick = async () => {
    const { title } = this.state.item;
    await this.remove(title); // remove 함수 호출하여 해당 데이터 삭제
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
            제품 삭제를 위한 UI 제공
      <Table style={{ margin: 16, padding: 16 }}>
        <tr>
        <td>Title : </td>
            <td><TextField
                  placeholder=""
                  fullWidth
                  onChange={this.onInputChange}
                  value={this.state.item.title}
                  onKeyPress={this.enterKeyEventHandler}
            /></td>
        </tr>  
      </Table>
      <Button
  color="secondary"
  variant="outlined"
  onClick={this.onButtonClick}
>
  제품 삭제
</Button>
    </div>
    );
  }
}

export default UIDeleteProduct;
