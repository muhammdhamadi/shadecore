use notify::{Watcher, RecursiveMode, EventKind};
use std::sync::mpsc::Sender;
use std::path::PathBuf;
use std::thread;
use std::time::Duration;

pub fn watch_frag_file(
    frag_path: PathBuf,
    tx: Sender<()>,
) {
    thread::spawn(move || {
        let (watch_tx, watch_rx) = std::sync::mpsc::channel();

        let mut watcher = notify::recommended_watcher(watch_tx)
            .expect("Failed to create file watcher");

        watcher
            .watch(&frag_path, RecursiveMode::NonRecursive)
            .expect("Failed to watch fragment shader");

        loop {
            if let Ok(event) = watch_rx.recv() {
                if matches!(event.kind, EventKind::Modify(_)) {
                    // debounce editor save storms
                    std::thread::sleep(Duration::from_millis(50));
                    let _ = tx.send(());
                }
            }
        }
    });
}
