(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ProgressBar = factory());
}(this, (function() {
    'use strict';

    var Shape = function Shape(container, opts) {
        var svg = this._createSvgElement('svg');
        var path = this._createSvgElement('path');
        svg.appendChild(path);
        container.appendChild(svg);
        
        this._path = path;
        this._container = container;
        this._opts = opts;
        this._setAttributes();
    };

    Shape.prototype._createSvgElement = function(tag) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    };
    
    Shape.prototype._setAttributes = function() {
        var path = this._path;
        var opts = this._opts;
        
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', opts.color || '#555');
        path.setAttribute('stroke-width', opts.strokeWidth || 1);
        
        if (opts.trailColor) {
            var trail = this._createSvgElement('path');
            trail.setAttribute('fill', 'none');
            trail.setAttribute('stroke', opts.trailColor);
            trail.setAttribute('stroke-width', opts.trailWidth || opts.strokeWidth || 1);
            trail.setAttribute('d', this._getPath());
            this._container.querySelector('svg').insertBefore(trail, path);
            this._trail = trail;
        }
        
        path.setAttribute('d', this._getPath());
    };

    Shape.prototype._getPath = function() {
        return 'M 50,50 m -47,0 a 47,47 0 1,1 94,0 a 47,47 0 1,1 -94,0';
    };

    Shape.prototype.animate = function(progress, opts, cb) {
        var self = this;
        var start = this._progress || 0;
        var end = progress;
        var duration = (opts && opts.duration) || 800;
        var startTime = null;
        
        this._progress = end;
        
        var step = function(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var ease = self._ease(elapsed, start, end - start, duration);
            
            self._setProgress(ease);
            
            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                self._setProgress(end);
                if (cb) cb();
            }
        };
        
        requestAnimationFrame(step);
    };

    Shape.prototype._ease = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    Shape.prototype._setProgress = function(progress) {
        var path = this._path;
        var length = path.getTotalLength ? path.getTotalLength() : 295.416;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length * (1 - progress);
    };

    Shape.prototype.set = function(progress) {
        this._progress = progress;
        this._setProgress(progress);
    };

    Shape.prototype.destroy = function() {
        var svg = this._container.querySelector('svg');
        if (svg) {
            this._container.removeChild(svg);
        }
    };

    var Circle = function Circle(container, opts) {
        Shape.call(this, container, opts);
    };

    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    Circle.prototype._getPath = function() {
        var r = 50 - (this._opts.strokeWidth || 1) / 2;
        return 'M 50,50 m 0,-' + r + ' a ' + r + ',' + r + ' 0 1,1 0,' + (2 * r) + ' a ' + r + ',' + r + ' 0 1,1 0,-' + (2 * r);
    };

    var Line = function Line(container, opts) {
        Shape.call(this, container, opts);
    };

    Line.prototype = Object.create(Shape.prototype);
    Line.prototype.constructor = Line;

    Line.prototype._getPath = function() {
        return 'M 0,' + (this._opts.strokeWidth || 1) / 2 + ' L 100,' + (this._opts.strokeWidth || 1) / 2;
    };

    return {
        Circle: Circle,
        Line: Line,
        Shape: Shape
    };
})));