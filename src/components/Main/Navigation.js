const Navigation = ({ categories, selected, setSelected }) => {
  const handleCategoryClick = (index) => {
    setSelected(index);
  };

  return (
    <nav>
      {categories.map((cat, i) => (
        <div
          key={i}
          className={`navigation-category 
                ${selected === i ? "selected" : ""}
                `}
          onClick={() => handleCategoryClick(i)}
        >
          {cat}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
