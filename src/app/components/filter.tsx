import React from 'react'
import {FiltersState, OrmOption} from '../entities/filter'

const inputStyle = 'rounded-md pb-1 bg-slate-700'

function useInput() {
  const [value, setValue] = React.useState('')
  const input = (
    <input
      className={inputStyle}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    />
  )
  return {value, input}
}

function useOrmFilter() {
  const [value, setValue] = React.useState(OrmOption.All)
  const input = (
    <select
      id="orm"
      className={inputStyle}
      onChange={(e) => setValue(e.target.value as OrmOption)}
    >
      <option key={OrmOption.All} value={OrmOption.All}>
        All
      </option>
      <option key={OrmOption.UseOrm} value={OrmOption.UseOrm}>
        ORM
      </option>
      <option key={OrmOption.WithoutOrm} value={OrmOption.WithoutOrm}>
        No ORM
      </option>
    </select>
  )
  return {value, input}
}

export default function ReportFilters() {
  const {value: webserverName, input: webserverNameInput} = useInput()
  const {value: language, input: languageInput} = useInput()
  const {value: database, input: databaseInput} = useInput()
  const {value: orm, input: ormFilter} = useOrmFilter()

  const filterState = new FiltersState(webserverName, language, database, orm)
  const filterElement = (
    <>
      <li>
        <label>
          webserver name: <br />
          {webserverNameInput}
        </label>
      </li>
      <li>
        <label>
          language: <br />
          {languageInput}
        </label>
      </li>
      <li>
        <label>
          database: <br />
          {databaseInput}
        </label>
      </li>
      <li>
        <label>
          orm: <br />
          {ormFilter}
        </label>
      </li>
    </>
  )
  return {filterState, filterElement}
}
