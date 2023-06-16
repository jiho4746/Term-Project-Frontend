import React from "react";
import { TextField, Table, Button } from "@material-ui/core";

class UIUpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } }; //사용자의 입력을 저장할 오브젝트
    this.search = props.search; // App 컴포넌트로부터 전달받은 search 함수를 할당
    this.modify = props.modify;
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      item: { ...prevState.item, [name]: value },
    }));
  };

  onSearchButtonClick = () => {
    this.search(this.state.item.title);
  };

  onUpdateButtonClick = () => {
    const { item } = this.state;
    const { id, title } = item;

    if (id && title) {
      const updatedItem = { id, title };
      this.modify(updatedItem);
      this.setState({ item: { id: "", title: "" } });
    }
  };

  render() {
    return (
      <div>
      제품 검색을 위한 UI 제공
      <Table style={{ margin: 16, padding: 16 }}>
        <tbody>
          <tr>
            <td>id : </td>
            <td>
              <TextField
                placeholder=""
                fullWidth
                onChange={this.onInputChange}
                name="id"
                value={this.state.item.id}
              />
            </td>
          </tr>
          <tr>
            <td>userId : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              title={this.state.item.title}
               
            /></td>
        </tr>
        <tr>
            <td>done : </td>
            <td><TextField
              placeholder=""
              fullWidth
              onChange={this.onInputChange}
              done={this.state.item.done}
              
            /></td>
        </tr> 
          <tr>
            <td>Title : </td>
            <td>
              <TextField
                placeholder=""
                fullWidth
                onChange={this.onInputChange}
                name="title"
                value={this.state.item.title}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button
        color="secondary"
        variant="outlined"
        onClick={this.onSearchButtonClick}
      >
        제품 검색
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={this.onUpdateButtonClick}
      >
        제품 수정
      </Button>
    </div>
    );
  }
}

export default UIUpdateProduct;
