import actions from "../actions"
import EventBus from "../lib/event-bus"
import {JointElements} from "./jointElements"
import _ from "lodash"
/**
 * Shape class
 */
export class Shape {
    constructor(graph, paper) {
        this.graph = graph
        this.paper = paper
        this.isContainer = false
        this.shape = null
        this.parent = null
        this.type = "Shape"
    }

    /**
     * Merge options default with options from arguments
     * @param options
     * @returns {TaskShape}
     */
    config(options) {
        this.options = Object.assign({}, this.options, options);
        return this;
    }

    /**
     * Emit a message to crown to display
     */
    showCrown() {
        let diffDy = -6
        let action = actions.designer.crown.show({
            y: this.options.y + diffDy,
            x: this.options.x + this.options.width
        })
        EventBus.$emit(action.type, action.payload)
    }

    /**
     * This method hides the crown of shape
     */
    hideCrown() {
        let action = actions.designer.crown.hide()
        EventBus.$emit(action.type, action.payload)
    }

    /**
     * Return the object jointjs
     * @returns {*}
     */
    getShape() {
        return this.shape;
    }

    /**
     * Unselect the shape
     */
    unselect() {
        this.hideCrown()
    }

    /**
     * Select the shape
     */
    select() {

    }

    /**
     * Set the parent in this Shape
     * @param parent
     * @returns {Shape}
     */
    setParent(parent) {
        this.parent = parent
        return this
    }

    /**
     * Return the type of shape
     * @param parent
     * @returns {string}
     */
    getType() {
        return this.type
    }

    resetFlows() {
        let links
        if (this.shape) {
            links = this.graph.getConnectedLinks(this.shape)
            _.each(links, (link) => {
                link.vertices([])
            })
        }
    }
}
