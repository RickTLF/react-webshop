import React, { Component } from "react";
import SearchForm from "../Components/Forms/SearchForm";
import { ProductCardMin } from "../Components/Items/ProductCard";
import { Modal, ModalLauncher } from "../Components/Misc/Modal";
import logo from "../logo.svg";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      searchValue: ''
    };
  }

  componentDidMount() {
    this.props.service.getAllProducts().then(data => {
      this.setState({ products: data });
    });
  }

  handleSearch = () => {
    this.props.service.search(this.state.searchValue).then(results => {
      this.setState({products: results})
    })
  }

  render() {
    return (
      <div>
        <Jumbotron
          value={this.state.searchValue}
          onSearchChange={e => this.setState({ searchValue: e.target.value })}
          onSearchClick={e => this.handleSearch()}
        />
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-3"} style={{ marginTop: 10 }}>
              <div className={"card"}>
                <div className={"card-body"}>Here comes the menu</div>
              </div>
            </div>
            <div className={"col-lg-9"}>
              <div className={"row"}>
                {this.state.products.map(product => (
                  <div className={"col-lg-4"}>
                    <CatalogItem
                      name={product.name}
                      price={product.price}
                      description={product.description}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Jumbotron(props) {
  return (
    <div className={"jumbotron jumbotron-fluid bg-dark"}>
      <div className={"container"}>
        <h1 className="font-weight-light text-light">Hello, world!</h1>
        <div className={"row"}>
          <div className={"col-lg-10 col-sm-10"}>
            <p className="font-weight-light text-light">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
          </div>
          <div className={"col-lg-2 col-sm-2"}>
            <img src={logo} alt={"product"} />
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: "" }} />
      </div>
      <div className={"col-lg-6"} style={{ margin: "auto" }}>
        <SearchForm
          value={props.seachValue}
          onChange={props.onSearchChange}
          onSearchClick={props.onSearchClick}
        />
      </div>
    </div>
  );
}

function CatalogItem(props) {
  let moreInfoButton = (
    <ModalLauncher target={props.name} className={"btn btn-light btn-block"}>
      More info
    </ModalLauncher>
  );
  let modalAction = (
    <button type={"button"} className={"btn btn-info"}>
      Add to cart
    </button>
  );

  let modalContent = (
    <ProductInfo name={props.name} src={logo} price={props.price}>
      <p className={"text-light"}>{props.description}</p>
    </ProductInfo>
  );

  return (
    <div>
      <ProductCardMin
        name={props.name}
        price={props.price}
        actions={moreInfoButton}
      />
      <Modal
        title={props.name}
        id={props.name}
        actions={modalAction}
        large
        center
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function ProductInfo(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-6"}>
        <img src={props.src} alt={props.name} />
      </div>
      <div className={"col-md-6"}>
        <p className={"text-muted"}>{props.children}</p>
        <span className={"text-info"}>&euro;{props.price}</span>
      </div>
    </div>
  );
}
