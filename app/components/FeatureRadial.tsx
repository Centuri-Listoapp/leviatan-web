import Image from "next/image";

type Props = {
  items: string[];
};

const FeatureRadial = ({ items }: Props) => {
  return (
    <div className="lv-features-grid">
      <div className="lv-radial">
        <Image
          src="/circle-target.webp"
          alt=""
          fill
          sizes="320px"
          className="lv-radial-glow"
        />
      </div>

      <div className="lv-feature-list">
        {items.map((item, i) => (
          <div key={i} className="lv-feature-item">
            <span className="lv-feature-num">{String(i + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureRadial;
