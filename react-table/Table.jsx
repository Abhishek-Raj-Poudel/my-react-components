import { useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp, FiChevronsLeft, FiChevronsRight, FiSearch } from "react-icons/fi";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";

import PropTypes from 'prop-types'

export default function Table({ columnsData, dataValue, title }) {

  Table.propTypes = {
    columnsData: PropTypes.array.isRequired,
    dataValue: PropTypes.array.isRequired,
    title: PropTypes.object,
  }
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => dataValue, [dataValue]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex } = state

  const [hideColumns, setHideColumns] = useState(true)
  const [hideSearchField, SetHideSearchField] = useState(true)

  return (
    <>
      <div className="flex justify-between p-4">
        <h2 className=" font-secondary text-2xl capitalize">{title}</h2>
        <div className="flex gap-2 relative w-fit">
          <div className="">
          <button className="flex justify-between items-center gap-2 w-full p-3 font-secondary border rounded " onClick={() => {setHideColumns(!hideColumns) }}> <span>Columns</span> <FiChevronDown /> </button>
          <div className={`${hideColumns ? "hidden" : "absolute"} bg-white w-fit p-5 border rounded`}>
            <div className="flex items-center  gap-2 py-2">
              <input className="size-4 py-5 border-b  accent-slate-900 " type="checkbox" {...getToggleHideAllColumnsProps()} />
              <span className="font-secondary whitespace-nowrap">Toggle All</span>
            </div>            {
              allColumns.map((column) => (
                <div className="flex items-center  gap-2 py-2" key={column.id}>
                  <input className="size-4 accent-slate-900" type="checkbox" {...column.getToggleHiddenProps()} />
                  <label className="font-secondary whitespace-nowrap" htmlFor=""  >
                    {column.Header}
                  </label>
                </div>
              ))
            }

          </div>
          </div>

        <label htmlFor="searchItem" className=" flex items-center ml-4 group rounded  border border-slate-600 px-3 group" >
        <div className="p-2" onClick={() => SetHideSearchField(!SetHideSearchField)}>
          <FiSearch />
        </div>
          <input
            className={`${hideSearchField ? 'w-0' : 'w-full'} py-2 focus:outline-none duration-500  placeholder:font-secondary`}
            id="searchItem"
            placeholder=" Search"
            type="text"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </label>
        </div>
      </div>
      <table
        className="min-w-full divide-y-2 divide-slate-200 bg-white text-sm"
        {...getTableProps()}
      >
        <thead className="ltr:text-left rtl:text-right">
          {headerGroups.map((headerGroup, index) => (
            <tr
              key={index}
              {...headerGroup.getHeaderGroupProps()} className="">
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className=" px-4 py-4 font-bold text-slate-900 text-start"
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="divide-y divide-slate-200">
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index} className="odd:bg-slate-50">
                {row.cells.map((cell, index) => (
                  <td
                    key={index}
                    className=" px-4 py-4 font-medium text-slate-900"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-5 justify-center items-center py-5">
        <div className="flex gap-2 items-center">

          <button className=" rounded my-5  group w-fit h-fit px-4 py-2  bg-slate-200 text-slate-600 focus:outline-primary font-secondary font-bold uppercase tracking-widest flex gap-2 iems-center disabled:bg-slate-200 disabled:text-slate-300 disabled:border-0 disabled:hidden" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><FiChevronsLeft /></button>
          <button className=" rounded my-5  group w-fit h-fit px-4 py-2 pt-3 bg-slate-200 text-slate-600 focus:outline-primary font-secondary text-xs font-bold uppercase tracking-widest flex gap-2 iems-center disabled:bg-slate-200 disabled:text-slate-300 disabled:border-0 disabled:hidden" onClick={() => previousPage()} disabled={!canPreviousPage}>Previouse</button>
        </div>

        <span>Page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
        <div className="flex gap-2 items-center">
          <button className=" rounded my-5 group w-fit h-fit px-4 py-2 pt-3 bg-slate-500 border border-slate-500 text-slate-50 focus:outline-primary font-secondary text-xs font-bold uppercase tracking-widest flex gap-2 iems-center disabled:bg-slate-200 disabled:text-slate-300 disabled:border-0 disabled:hidden" onClick={() => nextPage()} disabled={!canNextPage} >next</button>
          <button className=" rounded my-5  group w-fit h-fit px-4 py-2 bg-slate-500 border border-slate-500 text-slate-50 focus:outline-primary font-secondary font-bold uppercase tracking-widest flex gap-2 iems-center disabled:bg-slate-200 disabled:text-slate-300 disabled:border-0 disabled:hidden" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} ><FiChevronsRight /></button>

        </div>
      </div>
    </>
  );
}
