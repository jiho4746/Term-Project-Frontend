import React from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import DeleteOutlined from "@material-ui/icons/DeleteOutlined";


class Product extends React.Component {
  // 부모로부터 물려받은 props의 item 속성에 담긴 객체를 state의 item 속성에 담음
  constructor(props) {
    super(props); //부모 생성자 반드시 호출
    this.state = { item: props.item, readOnly: true }; //상태 변수 추가 readOnly
    this.delete = props.delete; //App 컴포넌트로부터 전달받은 delete 함수 연결
    this.update = props.update;
  }
  //delete 함수 호출하는 이벤트 핸들러 추가
  deleteEventHandler = () => {
    this.delete(this.state.item);
  };
  //readOnly 변수 값을 false로 만드는 함수 추가
  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log("ReadOnly? ", this.state.readOnly);
    });
  };
  //아이템 타이틀 수정 후 Enter 키를 누르면 readOnly 변수를 true로 변경하는 함수 추가
  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
      this.update(this.state.item); //enter를 누르면 저장
    }
  };
  //아이템 타이틀에 키 입력이 일어날 때 마다 item.title을 새 값으로 변경하는 함수 작성
  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem }); //체크박스가 변경되면 저장
  };
  //아이템의 done 변수 값을 true <-> false로 전환해 주는 함수 작성
  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem });
    this.update(this.state.item);
  };

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
        <ListItemText>
          <InputBase
            inputProps={{
              "aria-label": "naked",
              readOnly: this.state.readOnly, //<InputBase>의 inputProps 속성의 readOnly 변수 설정
            }}
            type="text"
            id={item.id} //각 리스트를 구분하려고 id를 연결
            name={item.id} //각 리스트를 구분하려고 id를 연결
            value={item.title}
            fullWidth={true}
            onClick={this.offReadOnlyMode} //onClick 이벤트 핸들러로 offReadOnlyMode 함수 연결
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
          />
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete Product"
            onClick={this.deleteEventHandler}
          >
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Product;
