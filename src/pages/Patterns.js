import React from "react";
import { useEffect } from "react";
import Pattern from "../components/Pattern";
import { getPresetPatterns } from "../helpers/PresetPatterns";

const presets = getPresetPatterns();

export default function Patterns() {
  useEffect(() => {
    document.title = "Let's Play Bingo! | Patterns";
  });
  return (
    <section className="pattern-list">
      <div className="row container gutters-sm">
        <div className="col full-width">
          <h2>Patterns</h2>
        </div>
        {presets.slice(1).map((preset) => {
          return (
            <div
              key={preset.value}
              className="pattern-col col padding-md">
              <Pattern
                editable={false}
                pattern={preset}
                showTitle={true}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
