import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddProduct extends React.Component {
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
    this.setState({ item: { title: "" } }); //추가 후에는 현재 state 객체를 초기화
  };
  

  //Enter 키 입력 시 아이템 추가
  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.onButtonClick();
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Product here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
              onKeyPress={this.enterKeyEventHandler} //enterKeyEventHandler를 이벤트 핸들러와 연결
            />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              +
            </Button>
            
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddProduct;
