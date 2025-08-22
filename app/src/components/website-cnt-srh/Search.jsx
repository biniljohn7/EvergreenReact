import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastsStore } from "react-toasts";
import { Spinner } from "reactstrap";
import {webSrh} from "../../api/commonAPI";
import Wrapper from "./wrapper.style";

const Search = (props) => {
  const { key } = useParams();
  const [loading, setLoading] = useState(true);
  const [srhKey, setSrhKey] = useState('');
  const [srhCnt, setSrhCnt] = useState([]);

  useEffect(() => {
    const cntSrh = async (payload) => {
      try {
        const res = await webSrh(payload);
        if (res.success === 1) {
            setSrhCnt(res.data.suggestions || []);
        } else {
          ToastsStore.error(res.message);
        }
      } catch (err) {
        console.error(err);
        ToastsStore.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      cntSrh({key: key});
      setSrhKey(key);
    }
  }, [key]);

  document.title = "Search - " + window.seoTagLine;

  return loading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>
      Display Search results
    </Wrapper>
  );
};

export default Search
