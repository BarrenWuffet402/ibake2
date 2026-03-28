const React = require('react');
const { View, Text } = require('react-native');

const MapView = ({ children, style }) =>
  React.createElement(View, { style: [style, { backgroundColor: '#e8e0d4', alignItems: 'center', justifyContent: 'center' }] },
    React.createElement(Text, { style: { color: '#8B5E3C', fontSize: 16 } }, '🗺️ Map (mobile only)'),
    children
  );

MapView.Animated = MapView;

const Marker = () => null;
const Callout = () => null;
const Circle = () => null;
const Polygon = () => null;
const Polyline = () => null;

const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = null;

module.exports = MapView;
module.exports.default = MapView;
module.exports.Marker = Marker;
module.exports.Callout = Callout;
module.exports.Circle = Circle;
module.exports.Polygon = Polygon;
module.exports.Polyline = Polyline;
module.exports.PROVIDER_GOOGLE = PROVIDER_GOOGLE;
module.exports.PROVIDER_DEFAULT = PROVIDER_DEFAULT;
