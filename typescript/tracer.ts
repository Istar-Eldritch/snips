/**
 *  A tracer helper function
 *
 *  Usage:
 *  const tracer = new LocalTracer('expensiveFunction');
 *  expensiveFunctionCall();
 *  tracer.endSpan();
 *
 *  You can also pass the tracer to the traced functions and use `tracer.createChild('name')`
 *  to trace new internal functions. When the parent span is ended the tracer will log the results.
 */

export interface Span {
  createChild(name: string): Span;
  endSpan(): void;
}


export class LocalTracer implements Span {
  private spans: LocalTracer[];
  private parentSpan?: LocalTracer;
  protected name: string;
  protected from: Date;
  protected to?: Date;

  constructor(name: string, parentSpan?: LocalTracer) {
    this.parentSpan = parentSpan;
    this.spans = [];
    this.name = name;
    this.from = new Date();
  }

  createChild(name: string): Span {
    const newSpan = new LocalTracer(name, this);
    this.spans.push(newSpan);
    return newSpan;
  }

  endSpan(): void {
    this.to = new Date();
    if (!this.parentSpan) {
      console.trace(this.serialize());
    }
  }

  serialize(indent: number = 0): string {
    try {
      const spans = this.spans.map((span) => span.serialize(indent + 1)).join('');
      const time = this.to ? `${this.to.getTime() - this.from.getTime()}ms` : 'Pending';
      const _indent = '\t'.repeat(indent);
      return `${_indent}${this.name}: ${time}\n${spans}`;

    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
