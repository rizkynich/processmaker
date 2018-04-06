import { Point } from './point';

export class ManhathanRouter {
    mindist: number;

    constructor() {
        this.mindist = 20;
    }
    createRoute(posx1, posy1, posx2, posy2) {
        //fake  example values
        /*********************/
        let points = [];
        let fromPt = new Point(posx1, posy1);
        let fromDir = 1;

        let toPt =  new Point(posx2, posy2);
        let toDir = 3;

        let connection = null;
        //fake  example values
        /*********************/
        this.route(connection, toPt, toDir, fromPt, fromDir, points);
        return points
    }
    route(conn, fromPt, fromDir, toPt, toDir, points) {
        var TOL,
            TOLxTOL,
            UP,
            RIGHT,
            DOWN,
            LEFT,
            xDiff,
            yDiff,
            nPoint,
            dir,
            pos;

        TOL = 0.1;
        TOLxTOL = 0.01;

        // fromPt is an x,y to start from.
        // fromDir is an angle that the first link must
        UP = 0;
        RIGHT = 1;
        DOWN = 2;
        LEFT = 3;

        xDiff = fromPt.x - toPt.x;
        yDiff = fromPt.y - toPt.y;

        if (((xDiff * xDiff) < (TOLxTOL)) && ((yDiff * yDiff) < (TOLxTOL))) {
            points.push(toPt);
            return;
        }

        if (fromDir === LEFT) {
            if ((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir === RIGHT)) {
                nPoint = toPt;
                dir = toDir;
            } else {
                if (xDiff < 0) {
                    nPoint = new Point(fromPt.x - this.mindist, fromPt.y);
                } else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) &&
                    (toDir === UP))) {
                    nPoint = new Point(toPt.x, fromPt.y);
                } else if (fromDir === toDir) {
                    pos = Math.min(fromPt.x, toPt.x) - this.mindist;
                    nPoint = new Point(pos, fromPt.y);
                } else {
                    nPoint = new Point(fromPt.x - (xDiff / 2), fromPt.y);
                }

                if (yDiff > 0) {
                    dir = UP;
                } else {
                    dir = DOWN;
                }
            }
        } else if (fromDir === RIGHT) {
            if ((xDiff < 0) && ((yDiff * yDiff) < TOL) && (toDir === LEFT)) {
                nPoint = toPt;
                dir = toDir;
            } else {
                if (xDiff > 0) {
                    nPoint = new Point(fromPt.x + this.mindist, fromPt.y);
                } else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) &&
                    (toDir === UP))) {
                    nPoint = new Point(toPt.x, fromPt.y);
                } else if (fromDir === toDir) {
                    pos = Math.max(fromPt.x, toPt.x) + this.mindist;
                    nPoint = new Point(pos, fromPt.y);
                } else {
                    nPoint = new Point(fromPt.x - (xDiff / 2), fromPt.y);
                }

                if (yDiff > 0) {
                    dir = UP;
                } else {
                    dir = DOWN;
                }
            }
        } else if (fromDir === DOWN) {
            if (((xDiff * xDiff) < TOL) && (yDiff < 0) && (toDir === UP)) {
                nPoint = toPt;
                dir = toDir;
            } else {
                if (yDiff > 0) {
                    nPoint = new Point(fromPt.x, fromPt.y + this.mindist);
                } else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) &&
                    (toDir === LEFT))) {
                    nPoint = new Point(fromPt.x, toPt.y);
                } else if (fromDir === toDir) {
                    pos = Math.max(fromPt.y, toPt.y) + this.mindist;
                    nPoint = new Point(fromPt.x, pos);
                } else {
                    nPoint = new Point(fromPt.x, fromPt.y - (yDiff / 2));
                }

                if (xDiff > 0) {
                    dir = LEFT;
                } else {
                    dir = RIGHT;
                }
            }
        } else if (fromDir === UP) {
            if (((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir === DOWN)) {
                nPoint = toPt;
                dir = toDir;
            } else {
                if (yDiff < 0) {
                    nPoint = new Point(fromPt.x, fromPt.y - this.mindist);
                } else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) &&
                    (toDir === LEFT))) {
                    nPoint = new Point(fromPt.x, toPt.y);
                } else if (fromDir === toDir) {
                    pos = Math.min(fromPt.y, toPt.y) - this.mindist;
                    nPoint = new Point(fromPt.x, pos);
                } else {
                    nPoint = new Point(fromPt.x, fromPt.y - (yDiff / 2));
                }

                if (xDiff > 0) {
                    dir = LEFT;
                } else {
                    dir = RIGHT;
                }
            }
        }

        this.route(conn, nPoint, dir, toPt, toDir, points);
        points.push(fromPt);
    }

}
