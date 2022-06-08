import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class DragNDropTest extends React.PureComponent {
  static defaultProps = {
    className: "layout bg-gray-100 overflow-hidden h-full ",
    items: 10,
    cols: 12,
    rowHeight: 30,
    isResizable: false,
    isBounded: true,
    autoSize: false,
    onDragStop: function(layout) {
      console.log("drag stop", layout);
    },
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    verticalCompact: false
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} className="bg-gray-500 border-black border-2 ">
          <span className=" text-center">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    // const p = this.props;
    // return _.map(new Array(p.items), function(item, i) {
    //   const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
    //   return {
    //     x: (i * 2) % 12,
    //     y: Math.floor(i / 6) * y,
    //     w: 2,
    //     h:2,
    //     // h: y,
    //     i: i.toString()
    //   };
    // });

   let values= [
      {
          "w": 2,
          "h": 2,
          "x": 0,
          "y": 0,
          "i": "0",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 2,
          "y": 0,
          "i": "1",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 4,
          "y": 0,
          "i": "2",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 6,
          "y": 0,
          "i": "3",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 8,
          "y": 0,
          "i": "4",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 6,
          "y": 11,
          "i": "5",
          "moved": true,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 0,
          "y": 2,
          "i": "6",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 2,
          "y": 3,
          "i": "7",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 4,
          "y": 5,
          "i": "8",
          "moved": false,
          "static": false
      },
      {
          "w": 2,
          "h": 2,
          "x": 6,
          "y": 5,
          "i": "9",
          "moved": false,
          "static": false
      }
  ]

  return values.map(function(item) {
    return {
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      i: item.i,
      moved: item.moved,
      static: item.static
    };
  });

  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

