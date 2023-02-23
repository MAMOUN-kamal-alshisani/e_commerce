
function Categories ({ categories, searchedItems }){
    return (
      <div className="inputItem_div">
      {categories?.map((category) => (
        <div className="filter_btn_div">
          <button
            onClick={() => searchedItems(category)}
            className="filter_btn"
          >
            {category}
          </button>
        </div>
      ))}
    </div>
    );
  };
  
export default Categories
  