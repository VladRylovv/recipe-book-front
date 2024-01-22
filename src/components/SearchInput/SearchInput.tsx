import React, { useState } from "react"
import { Button, Input } from "../UI"
import { ISearchInput } from "./ISearchInput"
import styles from "./SearchInput.module.scss"

const SearchInput: React.FC<ISearchInput> = ({
  searchValue,
  onChangeSearchValue,
}) => {
  const [valueInput, setValueInput] = useState(searchValue)

  return (
    <div className={styles.search_input_wrap}>
      <Input
        className={styles.search_input}
        placeholder={"Search..."}
        value={valueInput}
        onChange={(value) => setValueInput(value)}
      />
      <Button
        label={"Search"}
        onClick={() => onChangeSearchValue(valueInput)}
      />
    </div>
  )
}

export default SearchInput
