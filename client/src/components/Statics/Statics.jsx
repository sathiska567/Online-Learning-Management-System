import React from "react";
import { useInView } from "react-intersection-observer";
import StaticStyles from "./Statics.module.css";
import CountUp from "react-countup";
import { Statistic } from "antd";

const formatter = (value) => (
  <>
    <CountUp end={value} separator="," duration={3} />+
  </>
);

const Statics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

  return (
    <div className={StaticStyles.MainContainer}>
      <div className={StaticStyles.statSection}>
        <div className={StaticStyles.icon}>
          <img src="/public/LearnerIcon.svg" alt="learner Icon" />
        </div>
        <div className={StaticStyles.statText}>
          <div ref={ref}>
            <Statistic
              className={StaticStyles.statCount}
              title="Courses"
              value={inView ? 659 : 0}
              formatter={formatter}
            />
          </div>
        </div>
      </div>
      <div className={StaticStyles.statSection}>
        <div className={StaticStyles.icon}>
          <img src="/public/LearnerIcon.svg" alt="learner Icon" />
        </div>
        <div className={StaticStyles.statText}>
          <div>
            <Statistic
              className={StaticStyles.statCount}
              title="Courses"
              value={inView ? 659 : 0}
              formatter={formatter}
            />
          </div>
        </div>
      </div>
      <div className={StaticStyles.statSection}>
        <div className={StaticStyles.icon}>
          <img src="/public/LearnerIcon.svg" alt="learner Icon" />
        </div>
        <div className={StaticStyles.statText}>
          <div>
            <Statistic
              className={StaticStyles.statCount}
              title="Completed Learners"
              value={inView ? 659 : 0}
              formatter={formatter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
