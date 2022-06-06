const ScrollUpButton = () => {
  const scrollUp = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-up-btn" onClick={scrollUp}>
      <p>▲</p>
    </div>
  );
};

export default ScrollUpButton;
