import React from "react";
import Pagination from "react-js-pagination";
import PaginationWrapper from "./pagination.style";

const pagination = (props) => {
  return (
    <PaginationWrapper>
      <Pagination
        prevPageText={<i className="fa fa-chevron-left" aria-hidden="true"></i>}
        nextPageText={
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        }
        hideFirstLastPages
        activePage={props.activePage}
        itemsCountPerPage={parseInt(props.count)}
        totalItemsCount={props.length}
        pageRangeDisplayed={4}
        onChange={props.handler}
        linkClassPrev="iconcolor"
        linkClassNext="iconcolor"
        activeLinkClass="activelink"
        itemClass="itemClass"
        linkClass="linkClass"
        disabledClass="disableddata"
      />
    </PaginationWrapper>
  );
};

export default pagination;
