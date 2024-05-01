import React from "react";
import Pagination from "react-js-pagination";
import PaginationWrapper from "./pagination.style";

const pagination = (props) => {
  return (
    <PaginationWrapper>
      <Pagination
        prevPageText={<span className="material-symbols-outlined">chevron_left</span>}
        nextPageText={<span className="material-symbols-outlined">chevron_right</span>}
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
