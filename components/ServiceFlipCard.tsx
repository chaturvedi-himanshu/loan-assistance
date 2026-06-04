interface ServiceFlipCardProps {
  icon: string;
  rate: string;
  title: string;
  description: string;
  installment: string;
}

export default function ServiceFlipCard({
  icon,
  rate,
  title,
  description,
  installment,
}: ServiceFlipCardProps) {
  return (
    <div className="singleService_2">
      <div className="flipper">
        <div className="front">
          <i className={icon}></i>
          <div className="clearfix"></div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className="back">
          <i className={icon}></i>
          <div className="clearfix"></div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
