import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

import ItemList from "../ItemList";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  componentWillMount() {
    const tab = "all";
    const itemsPromise = agent.Items.all;

    this.props.onLoad(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );

    this.setState({ searchResults: [] });
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  changeSearchInput = (e) => {
    if (String(e.target.value).length >= 3) {
      fetch("http://localhost:3000/api/items?title=" + String(e.target.value))
        .then((response) => response.json())
        .then((data) => {
          console.log(data.items);

          const items = data.items;

          this.setState({ searchResults: items });
        });
    }
  };

  render() {
    return (
      <div className="home-page">
        <Banner changeSearchInput={this.changeSearchInput} />

        <ItemList items={this.state.searchResults}></ItemList>

        <div className="container page">
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
