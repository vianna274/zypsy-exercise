type Props = {
  fill?: string;
  stroke: string;
};

const StarIcon: React.FC<Props> = ({ fill = 'transparent', stroke }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.41333L11.4458 6.4075L16.9167 7.21333L12.9583 11.0983L13.8925 16.5867L9 13.9942L4.1075 16.5867L5.04167 11.0983L1.08333 7.21333L6.55333 6.4075L9 1.41333Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StarIcon;
