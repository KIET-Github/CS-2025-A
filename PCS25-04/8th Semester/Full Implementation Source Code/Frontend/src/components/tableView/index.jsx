import classNames from "classnames";
import DropdownSelect from "../dropdownSelection";
import styles from "./index.module.scss";

const mapStringToClassName = (str) => {
  switch (str) {
    case "idx":
      return styles.idx;
    case "center":
      return styles.center;
  }
};

const getClassNames = (classNames) => {
  return classNames
    ? classNames?.map((el) => ({ [mapStringToClassName(el)]: true }))
    : [];
};

/**
 * For adding classname to an heading add
 */
const TableView = ({
  headingItems,
  children,
  total,
  pageNo,
  onPageChange,
  pageSize,
  pageStart,
  disablePagination,
  selectedLength,
  noHoverChange,
  alignTop,
  className,
}) => {
  const changePage = (value) => {
    const newPage = pageNo + value;
    if (newPage < pageNo && newPage > pageStart - 1) {
      return onPageChange(newPage);
    }
    if (total > pageSize * (pageStart === 0 ? pageNo + 1 : pageNo)) {
      if (newPage > pageStart - 1) {
        onPageChange(newPage);
      }
    }
  };

  return (
    <div className={styles.tableRoot}>
      <div className={classNames(styles.list, className)}>
        <table
          className={classNames({
            [styles.noHover]: noHoverChange,
            [styles.alignTop]: alignTop,
          })}
        >
          <thead>
            <tr>
              {headingItems?.map((el, idx) =>
                typeof el === "string" ? (
                  <th key={el + idx}>
                    <div>{el}</div>
                  </th>
                ) : (
                  <th
                    className={classNames(...getClassNames(el?.classNames))}
                    key={el?.title + idx}
                    {...(el?.colSpan ? { colSpan: el?.colSpan } : {})}
                  >
                    <div>
                      {/* {el?.tooltip ? (
                        <Tooltip direction={"bottom"} content={el?.tooltip}>
                          {el?.title}
                        </Tooltip>
                      ) : (
                        el?.title
                      )} */}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          {children}
        </table>
      </div>
      {!disablePagination && (
        <div className={styles.pagination}>
          <p className={styles.link} onClick={() => changePage(-1)}>
            {"<<"}Prev
          </p>
          <p>
            Showing{" "}
            {pageStart === 0
              ? pageSize * pageNo + 1
              : pageSize * (pageNo - 1) + 1}{" "}
            -{" "}
            {pageStart === 0
              ? Math.min(pageSize * ((pageNo ?? 0) + 1), total ?? 0) ?? 0
              : Math.min((pageSize ?? 0) * (pageNo ?? 0), total ?? 0) ?? 0}{" "}
            / {total ?? 0} Results
          </p>

          {selectedLength ? (
            <p className={styles.selected}>
              {selectedLength} <span>Selected</span>
            </p>
          ) : (
            <></>
          )}
          <div className={styles.pageSize}>
            Page Size
            <DropdownSelect
              className={styles.select}
              value={pageSize}
              onChange={(e) => {
                localStorage.setItem("pageSize", JSON.parse(e?.target?.value));
                window?.location?.reload();
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </DropdownSelect>
          </div>
          <p
            className={styles.link}
            onClick={() => {
              changePage(1);
            }}
          >
            Next{">>"}
          </p>
        </div>
      )}
    </div>
  );
};
export default TableView;
