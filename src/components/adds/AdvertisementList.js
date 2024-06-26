import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon";
import Adds from "./Adds";
import Sorting from "../Sorting";
import { useGetAddsQuery, useGetSortedByQuery } from "../../store";

function AdvertisementList() {
  const [sortCriteria, setSortCriteria] = useState(null);
  const { data: advertisements = [], isFetching: isFetchingAdds } =
    useGetAddsQuery();
  const {
    data: sortedAdvertisements = [],
    isFetching: isFetchingSorted,
    refetch: refetchSorted,
  } = useGetSortedByQuery(sortCriteria, { skip: sortCriteria === null });

  useEffect(() => {
    if (sortCriteria !== null) {
      refetchSorted();
    }
  }, [sortCriteria, refetchSorted]);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const isFetching = sortCriteria !== null ? isFetchingSorted : isFetchingAdds;
  const adsToDisplay =
    sortCriteria !== null ? sortedAdvertisements : advertisements;

  return (
    <>
      <Sorting onSort={handleSort} />
      {isFetching ? <LoadingIcon /> : <Adds advertisements={adsToDisplay} />}
    </>
  );
}

export default AdvertisementList;
