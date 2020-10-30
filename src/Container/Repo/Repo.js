import React, { Component } from "react";
import "./Repo.css";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
class Repo extends Component {
  state = {
    data: "",
    loading: false,
    redirect: false,
    currentPage: 1,
    pageSize: 6,
    pageIndex: 0,
  };
  handlePageClick = (event) => {
    this.setState({ pageIndex: event.selected });
  };
  componentDidMount() {
    this.setState({ loading: true });

    const token = localStorage.getItem("bearertoken");

    axios
      .get("/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        this.setState({ data: resp.data, loading: false });
      });
  }
  handleLogout = (e) => {
    localStorage.removeItem("bearertoken");
    this.setState({ redirect: true });
    e.preventDefault();
  };
  renderRepoData() {
    const repos = this.state.data;
    if (repos.length > 0) {
      return repos
        .slice(
          this.state.pageIndex * this.state.pageSize,
          this.state.pageIndex * this.state.pageSize + this.state.pageSize
        )
        .map((user) => {
          const { full_name, forks, owner, clone_url, html_url,node_id } = user;

          return (
            <div key={node_id}
              className="col-sm-4"
              style={{ paddingLeft: "40px", paddingTop: "30px" }}
            >
              <div className="card" style={{ minHeight: "400px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <img
                    src={owner.avatar_url}
                    alt="Avatar"
                    style={{ width: "150px", borderRadius: "50%" }}
                  />
                </div>
                <p style={{ paddingTop: "20px", textAlign: "center" }}>
                  {" "}
                  Repo Name: {full_name}
                </p>
                <p style={{ paddingTop: "10px", textAlign: "center" }}>
                  {" "}
                  User Name : {owner.login}
                </p>
                <p style={{ paddingTop: "10px", textAlign: "center" }}>
                  {" "}
                  Forks:{forks}
                </p>
                <p style={{ paddingTop: "5px", textAlign: "center" }}>
                  {" "}
                  Clone Url: {clone_url}{" "}
                </p>
                <p style={{ paddingTop: "5px", textAlign: "center" }}>
                  {" "}
                  <a href={html_url}> Click Here to Go to Repo</a>
                </p>
              </div>
            </div>
          );
        });
    }
  }

  render() {
    let paginationElement;
    if (this.state.data.length > 0) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={this.state.data.length / 6}
          pageRangeDisplayed={10}
          onPageChange={(event) => this.handlePageClick(event)}
          marginPagesDisplayed={6}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          initialPage={0}
        />
      );
    }
    var repos = (
      <div>
        <div
          style={{
            backgroundColor: "#DCDCDC",
            minHeight: "1000px",
            marginLeft: "-20px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "30px" }}>
              Github Repos
            </strong>
          </h3>

          <button
            type="button"
            class="btn btn btn-secondary offset-lg-10"
            id="log"
            onClick={this.handleLogout}
            style={{ marginTop: "-120px" }}
          >
            Logout
          </button>

          <div className="row col-sm-12">{this.renderRepoData()}</div>
          <div className="pager d-flex justify-content-center py-5">
            {paginationElement}
          </div>
        </div>
      </div>
    );

    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.loading) {
      repos = <Spinner />;
    }

    return repos;
  }
}

export default withErrorHandler(Repo, axios);
