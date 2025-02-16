export class ElementCreator {
    constructor(tagName, className, content = '', attributes) {
        this.element = document.createElement(tagName);

        if (className) {
            this.setClasses(className);
        }

        this.element.innerText = content;
        this.setAttributes(attributes);
    }

    setClasses(...classes) {
        classes.forEach(name => this.element.classList.add(name));
    }

    removeClasses(...classes) {
        classes.forEach(name => this.element.classList.remove(name));
    }


    removeClasses(...classes) {
        if (!classes) return;
        classes.forEach(name => this.element.classList.remove(name));
    }


    setAttributes(attributes) {
        if (!attributes) return;

        Object.entries(attributes).forEach(([key, val]) =>
            this.element.setAttribute(key, val),
        );
    }

    removeAttributes(attributes) {
        [...attributes].forEach(attr => this.element.removeAttribute(attr));
    }

    setInnerText(text) {
        this.element.innerText = text;
    }

    getInnerText() {
        return this.element.innerText;
    }

    append(...children) {
        children.forEach(child => {
            if (child instanceof HTMLElement) {
                this.element.append(child);
            } else if (child instanceof ElementCreator) {
                this.element.append(child.element);
            }
        })
    }

    appendTo(parent) {
        if (parent instanceof HTMLElement || parent instanceof ElementCreator) {
            parent.append(this.element);
        } else {
            throw new Error('parent not instanceof HTMLElement or ElementCreator');
        }
    }

    prepend(...children) {
        children.forEach((child) => {
            if (child instanceof HTMLElement) {
                this.element.prepend(child);
            } else if (child instanceof ElementCreator) {
                this.element.prepend(child.element);
            }
        });
    }

    prependTo(parent) {
        if (parent instanceof HTMLElement || parent instanceof ElementCreator) {
            parent.prepend(this.element);
        } else {
            throw new Error('parent not instanceof HTMLElement or ElementCreator');
        }
    }

    getFirstChild() {
        return this.element.firstChid;
    }

    insAfter(parent) {
        if (parent instanceof HTMLElement) {
            parent.insertBefore(this.element, parent.firstChild);
        } else if (parent instanceof ElementCreator) {
            parent.element.insertBefore(this.element, parent.element.children[0]);
        }
    }

    setCallback(event, cb) {
        this.element.addEventListener(event, cb);
    }

    getElement() {
        return this.element;
    }

    checkCLasses(...classes) {
        return classes.some(className => this.element.classList.contains(className));
    }

    getChildren() {
        return this.element.children;
    }
}