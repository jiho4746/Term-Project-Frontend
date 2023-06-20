import React from "react";
//import Product from "./Product";
import ProductRow from "./ProductRow.js";
//import AddProduct from "./AddProduct.js";
import "./App.css";
import {
  //Paper,
  //List,
  AppBar,
  Container,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Table,
  Button,
} from "@material-ui/core";
import { call, signout } from "./service/ApiService";
import UIAddProduct from "./UIAddProduct";
import UISearchProduct from "./UISearchProduct";
import UIUpdateProduct from "./UIUpdateProduct";
import UIDeleteProduct from "./UIDeleteProduct";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], //items를 빈 리스트로 초기화
      searchResults: [], // 검색 결과를 저장할 배열
      updatedItems: [],
      loading: true, //로딩 중이라는 표시
      tabValue: 0,
    };
  }

  //Add 컴포넌트의 componentDidMount 함수 작성
  componentDidMount() {
    call("/book", "GET", null)
      .then((response) => {
        this.setState({ items: response.data, loading: false }); //로딩이 완료되었다는 표시
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Add 함수
  add = (item) => {
    call("/book", "POST", item)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // delete 함수
  delete = (item) => {
    call("/book", "DELETE", item)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // put 함수
  update = (item) => {
    call("/book", "PUT", item)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //search 함수
  search = (searchTerm) => {
    const { items } = this.state;
    const searchResults = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ searchResults });
  };

  // modify 함수
  modify = async (updatedItem) => {
    try {
      await call("/book", "PUT", updatedItem);
      this.updateItems(updatedItem);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  updateItems = (updatedItem) => {
    const { items, searchResults } = this.state;
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        // 해당 아이템의 title 값만 업데이트
        return { ...item, title: updatedItem.title };
      } else {
        return item;
      }
    });

    const updatedSearchResults = searchResults.map((item) => {
      if (item.id === updatedItem.id) {
        // 해당 아이템의 title 값만 업데이트
        return { ...item, title: updatedItem.title };
      } else {
        return item;
      }
    });

    this.setState({
      items: updatedItems,
      searchResults: updatedSearchResults,
    });
  };

  // remove 함수
  remove = async (title) => {
    const { items } = this.state;

    const searchResults = items.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );

    try {
      await Promise.all(
        searchResults.map((item) => call("/book", "DELETE", item))
      );

      const updatedItems = items.filter(
        (item) => !searchResults.includes(item)
      );
      this.setState({ items: updatedItems });
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { items, searchResults, loading, tabValue } = this.state;
    const productList = searchResults.length > 0 ? searchResults : items;

    /*const productItems =
      items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {productList.map((item, idx) => (
              <Product
                item={item}
                key={item.id}
                delete={this.delete}
                update={this.update}
              />
            ))}
          </List>
        </Paper>
      );*/

    // table
    const productTable = (
      <div>
        <Table border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>삭제버튼</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, idx) => (
              <ProductRow
                item={item}
                key={item.id}
                delete={this.delete}
                update={this.update}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );

    // navigationBar 추가
    const navigationBar = (
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
        <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">텀프로젝트3 - 컴퓨터공학과 20200769 박지호</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    /* 로딩중이 아닐 때 렌더링 할 부분 */
    const ProductListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <Tabs value={tabValue} onChange={this.handleTabChange}>
            <Tab label="Add Product" />
            <Tab label="Search Product" />
            <Tab label="Update Product" />
            <Tab label="Delete Product" />
          </Tabs>
          <div style={{ marginTop: "30px" }}>
            {tabValue === 0 && <UIAddProduct add={this.add} />}
            {tabValue === 1 && <UISearchProduct search={this.search} />}
            {tabValue === 2 && (
              <UIUpdateProduct search={this.search} modify={this.modify} />
            )}
            {tabValue === 3 && <UIDeleteProduct remove={this.remove} />}
          </div>
        </Container>

        <div style={{ marginTop: "30px" }}>
        <div className="ProductTable">{productTable}</div>
      </div>
      </div>
    );

    /* 로딩중이 아닐 때 렌더링 할 부분 -텀프로젝트2의 GUI
    const ProductListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddProduct add={this.add} />
          <div className="ProductList">{productItems}</div>
          <div className="ProductTable">{productTable}</div>
          <br />
          <UIAddProduct add={this.add} />
          <br />
          <UISearchProduct search={this.search} />
          <br />
          <UIUpdateProduct search={this.search} modify={this.modify} />
          <br />
          <UIDeleteProduct remove={this.remove} />
        </Container>
      </div>
    );*/

    /* 로딩중일 때 표시할 부분 */
    const LoadingPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <h2>로딩중...</h2>
        </Container>
      </div>
    );

    return (
      <div className="App">{loading ? ProductListPage : LoadingPage}</div>
      // 로그인 여부에 따른 http://localhost:3000/ 페이지 구성은 Login.js의 handleSubmit에 추가 작성 (요구사항X)
      //<div className="App">{loading ? LoadingPage : ProductListPage}</div>
    );
  }
}

export default App;