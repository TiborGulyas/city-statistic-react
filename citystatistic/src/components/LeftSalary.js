import React from "react";
import { Icon } from "@iconify/react";
import walletIcon from "@iconify/icons-simple-line-icons/wallet";

let optionValue = "Account Manager";

export default function LeftSalary(props) {
  function selectJob(e) {
    optionValue = e.target.value;
    let jobSalary = document.querySelector("#left-job-salary");
    for (let data of props.salary) {
      if (data.title === optionValue) {
        jobSalary.innerHTML = data.percentile_50 + " $";
      }
    }
  }
  return (
    //<div className="col-md-3">
    <div className="stati bg-belize_hole">
      <Icon icon={walletIcon} width="3.5rem" />
      <div>
        <b id="left-job-salary">
          {props.salary.map((job) => (
            <span style={{ color: "white" }}>
              {(() => {
                switch (job.title) {
                  case optionValue:
                    return job.percentile_50 + " $";
                }
              })()}
            </span>
          ))}
        </b>
        <select
          style={{ maxWidth: "90%" }}
          name="jobs"
          id="jobs"
          onChange={selectJob}
        >
          {props.salary.map((job) => (
            <option value={job.title}>{job.title}</option>
          ))}
        </select>
      </div>
    </div>
    //</div>
  );
}
