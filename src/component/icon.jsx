export default function Icon(props) {
  const { icon } = props;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  );
}