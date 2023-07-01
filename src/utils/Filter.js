import { useEffect, useState } from "react";

function useSearchQuery({
  fileData,
  selectedCategory,
  name,
  selectedOption,
  selectedDateRange,
}) {
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    const filteredData = fileData.filter(
      (file) =>
        selectedCategory === "" ||
        file.category?.categoryName === selectedCategory ||
        ((name === "" ||
          file.category?.categoryName
            .toLowerCase()
            .includes(name.toLowerCase())) &&
          (selectedDateRange === null ||
            (new Date(file.uploadDate) >= selectedDateRange[0] &&
              new Date(file.uploadDate) <= selectedDateRange[1])))
    );
    if (selectedOption === "newest") {
      const sortedFiles = [...filteredData].sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
      setSearchQuery(sortedFiles);
    } else if (selectedOption === "oldest") {
      const sortedFiles = [...filteredData].sort(
        (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)
      );
      setSearchQuery(sortedFiles);
    } else {
      setSearchQuery(filteredData);
    }
  }, [selectedCategory, fileData, name, selectedOption, selectedDateRange]);

  return searchQuery;
}
export default useSearchQuery;
