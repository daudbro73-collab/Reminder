import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleReset = () => {
    try {
      const session = localStorage.getItem('muzakkir-session');
      if (session) {
        const { id } = JSON.parse(session);
        if (id) {
          ['reminder-tasks', 'reminder-habits', 'reminder-settings'].forEach((base) => {
            localStorage.removeItem(`${base}:${id}`);
          });
        }
      }
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-screen">
          <div className="error-card">
            <h1>Музаккир</h1>
            <p className="error-text">Не удалось загрузить приложение. Возможно, повреждены сохранённые данные.</p>
            <button type="button" className="error-btn" onClick={this.handleReset}>
              Сбросить данные и перезагрузить
            </button>
            <button type="button" className="error-btn secondary" onClick={() => window.location.reload()}>
              Просто перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
