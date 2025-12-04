#!/usr/bin/env python3
"""
MicroSim Quality Report Generator

This script scans all MicroSim directories and generates a quality report
based on the standardization rubric. It outputs a markdown file with
quality scores and TODO items for each MicroSim.

Usage:
    python quality-report.py [--output PATH]

Output:
    docs/sims/learning-graph/microsim-quality-report.md (default)
"""

import os
import re
import json
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple, Optional

# Quality score rubric
RUBRIC = {
    'title': 2,           # Title in index.md markdown
    'main_html': 10,      # main.html file present
    'yaml_metadata': 3,   # YAML title and description
    'social_images': 5,   # Social preview images in YAML
    'metadata_json': 10,  # metadata.json file present
    'metadata_valid': 20, # metadata.json passes schema validation
    'iframe': 10,         # iframe embed present
    'fullscreen_btn': 5,  # Fullscreen button present
    'iframe_example': 5,  # Copy-paste iframe example
    'preview_image': 5,   # Preview image file exists
    'overview': 5,        # Overview/description section
    'lesson_plan': 10,    # Lesson plan section
    'references': 5,      # References section
    'type_specific': 5,   # Type-specific format (p5.js link, etc.)
}

# Required Dublin Core fields for metadata.json validation
REQUIRED_METADATA_FIELDS = [
    'title', 'description', 'creator', 'date', 'subject',
    'type', 'format', 'language', 'rights'
]

# Directories to skip
SKIP_DIRS = {'templates', 'index.md'}


def get_project_root() -> Path:
    """Find the project root by looking for mkdocs.yml."""
    current = Path(__file__).resolve()
    for parent in current.parents:
        if (parent / 'mkdocs.yml').exists():
            return parent
    # Fallback to three levels up from script
    return current.parent.parent.parent


def get_sims_directory(project_root: Path) -> Path:
    """Get the sims directory path."""
    return project_root / 'docs' / 'sims'


def list_microsim_directories(sims_dir: Path) -> List[Path]:
    """List all MicroSim directories (excluding templates and files)."""
    microsims = []
    for item in sims_dir.iterdir():
        if item.is_dir() and item.name not in SKIP_DIRS:
            microsims.append(item)
    return sorted(microsims, key=lambda x: x.name)


def read_file_content(filepath: Path) -> Optional[str]:
    """Read file content, return None if file doesn't exist."""
    try:
        return filepath.read_text(encoding='utf-8')
    except (FileNotFoundError, IOError):
        return None


def parse_yaml_frontmatter(content: str) -> Dict:
    """Extract YAML frontmatter from markdown content."""
    if not content.startswith('---'):
        return {}

    # Find the closing ---
    lines = content.split('\n')
    end_idx = -1
    for i, line in enumerate(lines[1:], 1):
        if line.strip() == '---':
            end_idx = i
            break

    if end_idx == -1:
        return {}

    yaml_content = '\n'.join(lines[1:end_idx])

    # Simple YAML parsing (key: value)
    result = {}
    for line in yaml_content.split('\n'):
        if ':' in line and not line.strip().startswith('#'):
            key = line.split(':')[0].strip()
            value = ':'.join(line.split(':')[1:]).strip()
            result[key] = value

    return result


def check_metadata_json(microsim_dir: Path) -> Tuple[bool, bool, List[str]]:
    """
    Check metadata.json existence and validity.
    Returns: (exists, is_valid, missing_fields)
    """
    metadata_path = microsim_dir / 'metadata.json'

    if not metadata_path.exists():
        return False, False, REQUIRED_METADATA_FIELDS.copy()

    try:
        with open(metadata_path, 'r', encoding='utf-8') as f:
            metadata = json.load(f)

        missing = [field for field in REQUIRED_METADATA_FIELDS if field not in metadata]
        is_valid = len(missing) == 0

        return True, is_valid, missing
    except (json.JSONDecodeError, IOError):
        return True, False, ['Invalid JSON format']


def check_has_section(content: str, section_names: List[str]) -> bool:
    """Check if content has any of the specified markdown sections."""
    for name in section_names:
        pattern = rf'^##\s+{re.escape(name)}'
        if re.search(pattern, content, re.MULTILINE | re.IGNORECASE):
            return True
    return False


def check_has_iframe(content: str) -> bool:
    """Check if content has an iframe with main.html."""
    return bool(re.search(r'<iframe[^>]+src=["\']\.?/?main\.html["\']', content, re.IGNORECASE))


def check_has_iframe_example(content: str) -> bool:
    """Check if content has an iframe example in a code block."""
    return bool(re.search(r'```html\s*\n.*<iframe.*main\.html', content, re.DOTALL))


def check_has_fullscreen_button(content: str) -> bool:
    """Check if content has a fullscreen button/link."""
    patterns = [
        r'\[.*\]\(\.?/?main\.html\).*\.md-button',
        r'\.md-button.*\[.*\]\(\.?/?main\.html\)',
        r'\[Run.*\]\(.*main\.html\)',
    ]
    for pattern in patterns:
        if re.search(pattern, content, re.IGNORECASE):
            return True
    return False


def check_has_p5js_link(content: str, main_html_content: Optional[str]) -> Tuple[bool, bool]:
    """
    Check if MicroSim uses p5.js and has editor link.
    Returns: (uses_p5js, has_link)
    """
    uses_p5js = False
    if main_html_content:
        uses_p5js = 'p5.js' in main_html_content or 'p5.min.js' in main_html_content

    has_link = bool(re.search(r'editor\.p5js\.org/\w+/sketches/\w+', content))

    return uses_p5js, has_link


def check_preview_image(microsim_dir: Path, yaml_data: Dict) -> bool:
    """Check if a preview image exists for the MicroSim."""
    # Check for common image patterns
    name = microsim_dir.name
    image_patterns = [
        f'{name}.png',
        f'{name}.jpg',
        f'{name}.jpeg',
        f'{name}-preview.png',
        'preview.png',
    ]

    for pattern in image_patterns:
        if (microsim_dir / pattern).exists():
            return True

    # Check if YAML references an image that exists
    image_path = yaml_data.get('image', '')
    if image_path and f'/sims/{name}/' in image_path:
        return True

    return False


def analyze_microsim(microsim_dir: Path) -> Dict:
    """Analyze a single MicroSim and return its quality data."""
    name = microsim_dir.name
    index_path = microsim_dir / 'index.md'
    main_html_path = microsim_dir / 'main.html'

    # Read files
    index_content = read_file_content(index_path) or ''
    main_html_content = read_file_content(main_html_path)
    yaml_data = parse_yaml_frontmatter(index_content)

    # Check metadata.json
    metadata_exists, metadata_valid, metadata_missing = check_metadata_json(microsim_dir)

    # Check p5.js
    uses_p5js, has_p5js_link = check_has_p5js_link(index_content, main_html_content)

    # Calculate individual scores
    scores = {
        'title': bool(re.search(r'^#\s+.+', index_content, re.MULTILINE)),
        'main_html': main_html_path.exists(),
        'yaml_metadata': bool(yaml_data.get('title') and yaml_data.get('description')),
        'social_images': bool(yaml_data.get('image') or yaml_data.get('og:image')),
        'metadata_json': metadata_exists,
        'metadata_valid': metadata_valid,
        'iframe': check_has_iframe(index_content),
        'fullscreen_btn': check_has_fullscreen_button(index_content),
        'iframe_example': check_has_iframe_example(index_content),
        'preview_image': check_preview_image(microsim_dir, yaml_data),
        'overview': check_has_section(index_content, ['Description', 'Overview', 'About', 'How to Use']),
        'lesson_plan': check_has_section(index_content, ['Lesson Plan', 'Lesson']),
        'references': check_has_section(index_content, ['References', 'Reference']),
        'type_specific': (not uses_p5js) or has_p5js_link,  # Pass if not p5.js or has link
    }

    # Calculate total score
    total_score = sum(RUBRIC[key] for key, passed in scores.items() if passed)

    # Generate TODO items
    todos = []
    if not scores['main_html']:
        todos.append(f"Add main.html (+{RUBRIC['main_html']})")
    if not scores['yaml_metadata']:
        todos.append(f"Add YAML title/description (+{RUBRIC['yaml_metadata']})")
    if not scores['social_images']:
        todos.append(f"Add social preview images (+{RUBRIC['social_images']})")
    if not scores['metadata_json']:
        todos.append(f"Add metadata.json (+{RUBRIC['metadata_json']})")
    elif not scores['metadata_valid']:
        todos.append(f"Fix metadata.json validation (+{RUBRIC['metadata_valid']})")
    if not scores['iframe']:
        todos.append(f"Add iframe embed (+{RUBRIC['iframe']})")
    if not scores['fullscreen_btn']:
        todos.append(f"Add Fullscreen button (+{RUBRIC['fullscreen_btn']})")
    if not scores['iframe_example']:
        todos.append(f"Add iframe example (+{RUBRIC['iframe_example']})")
    if not scores['preview_image']:
        todos.append(f"Add preview image (+{RUBRIC['preview_image']})")
    if not scores['overview']:
        todos.append(f"Add Overview section (+{RUBRIC['overview']})")
    if not scores['lesson_plan']:
        todos.append(f"Add Lesson Plan (+{RUBRIC['lesson_plan']})")
    if not scores['references']:
        todos.append(f"Add References (+{RUBRIC['references']})")
    if uses_p5js and not has_p5js_link:
        todos.append(f"Add p5.js editor link (+{RUBRIC['type_specific']})")

    # Get stored quality score from YAML if present
    stored_score = yaml_data.get('quality_score', '')

    return {
        'name': name,
        'score': total_score,
        'stored_score': stored_score,
        'scores': scores,
        'todos': todos,
        'uses_p5js': uses_p5js,
    }


def generate_report(microsims: List[Dict], output_path: Path) -> None:
    """Generate the markdown quality report."""
    # Sort by score descending
    microsims_sorted = sorted(microsims, key=lambda x: x['score'], reverse=True)

    # Calculate statistics
    total = len(microsims_sorted)
    avg_score = sum(m['score'] for m in microsims_sorted) / total if total else 0
    score_80_plus = sum(1 for m in microsims_sorted if m['score'] >= 80)
    score_70_79 = sum(1 for m in microsims_sorted if 70 <= m['score'] < 80)
    score_60_69 = sum(1 for m in microsims_sorted if 60 <= m['score'] < 69)
    score_below_60 = sum(1 for m in microsims_sorted if m['score'] < 60)

    # Count common issues
    missing_lesson_plan = sum(1 for m in microsims_sorted if not m['scores']['lesson_plan'])
    missing_images = sum(1 for m in microsims_sorted if not m['scores']['preview_image'])
    missing_references = sum(1 for m in microsims_sorted if not m['scores']['references'])
    missing_overview = sum(1 for m in microsims_sorted if not m['scores']['overview'])

    # Generate report content
    report = f"""# MicroSim Quality Report

Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

This report summarizes the quality scores and improvement opportunities for all MicroSims in the Tracking AI Course.

## Quality Score Rubric (100 points max)

| Test | Points |
|------|--------|
| Title in index.md | {RUBRIC['title']} |
| main.html present | {RUBRIC['main_html']} |
| YAML title/description | {RUBRIC['yaml_metadata']} |
| Social preview images | {RUBRIC['social_images']} |
| metadata.json present | {RUBRIC['metadata_json']} |
| metadata.json valid | {RUBRIC['metadata_valid']} |
| iframe embed | {RUBRIC['iframe']} |
| Fullscreen button | {RUBRIC['fullscreen_btn']} |
| iframe example | {RUBRIC['iframe_example']} |
| Preview image | {RUBRIC['preview_image']} |
| Overview documentation | {RUBRIC['overview']} |
| Lesson plan | {RUBRIC['lesson_plan']} |
| References | {RUBRIC['references']} |
| Type-specific (p5.js link) | {RUBRIC['type_specific']} |

## MicroSim Quality Summary

| Name | Score | TODO to Improve Score |
|------|-------|----------------------|
"""

    # Add each MicroSim row
    for m in microsims_sorted:
        todo_str = ', '.join(m['todos']) if m['todos'] else 'None - meets standards!'
        report += f"| [{m['name']}](../{m['name']}/index.md) | {m['score']} | {todo_str} |\n"

    report += f"""
## Statistics

- **Total MicroSims:** {total}
- **Average Score:** {avg_score:.0f}/100
- **Scores 80+:** {score_80_plus} MicroSims
- **Scores 70-79:** {score_70_79} MicroSims
- **Scores 60-69:** {score_60_69} MicroSims
- **Scores below 60:** {score_below_60} MicroSims

## Common Improvement Opportunities

1. **Add Lesson Plans** - {missing_lesson_plan} MicroSims missing (+{RUBRIC['lesson_plan']} points each)
2. **Add Preview Images** - {missing_images} MicroSims missing (+{RUBRIC['preview_image']} points each)
3. **Add References Sections** - {missing_references} MicroSims missing (+{RUBRIC['references']} points each)
4. **Add Overview/Description** - {missing_overview} MicroSims need improvement (+{RUBRIC['overview']} points each)

## Priority Categories

### High Priority (score < 60)
"""

    high_priority = [m for m in microsims_sorted if m['score'] < 60]
    if high_priority:
        for m in high_priority:
            report += f"- [{m['name']}](../{m['name']}/index.md) (score: {m['score']})\n"
    else:
        report += "- None! All MicroSims score 60+\n"

    report += "\n### Medium Priority (score 60-69)\n"
    medium_priority = [m for m in microsims_sorted if 60 <= m['score'] < 70]
    if medium_priority:
        for m in medium_priority:
            report += f"- [{m['name']}](../{m['name']}/index.md) (score: {m['score']})\n"
    else:
        report += "- None in this category\n"

    report += "\n### Low Priority (score 70-79)\n"
    low_priority = [m for m in microsims_sorted if 70 <= m['score'] < 80]
    if low_priority:
        for m in low_priority:
            report += f"- [{m['name']}](../{m['name']}/index.md) (score: {m['score']})\n"
    else:
        report += "- None in this category\n"

    report += "\n### Meeting Standards (score 80+)\n"
    meeting_standards = [m for m in microsims_sorted if m['score'] >= 80]
    if meeting_standards:
        for m in meeting_standards:
            report += f"- [{m['name']}](../{m['name']}/index.md) (score: {m['score']})\n"
    else:
        report += "- None yet - work in progress!\n"

    # Write report
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(report, encoding='utf-8')
    print(f"Report generated: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description='Generate MicroSim Quality Report'
    )
    parser.add_argument(
        '--output', '-o',
        type=str,
        default=None,
        help='Output path for the report (default: docs/sims/learning-graph/microsim-quality-report.md)'
    )
    args = parser.parse_args()

    # Find project root and sims directory
    project_root = get_project_root()
    sims_dir = get_sims_directory(project_root)

    if not sims_dir.exists():
        print(f"Error: Sims directory not found at {sims_dir}")
        return 1

    # Set output path
    if args.output:
        output_path = Path(args.output)
    else:
        output_path = sims_dir / 'learning-graph' / 'microsim-quality-report.md'

    # List and analyze all MicroSims
    microsim_dirs = list_microsim_directories(sims_dir)
    print(f"Found {len(microsim_dirs)} MicroSim directories")

    microsims = []
    for microsim_dir in microsim_dirs:
        print(f"  Analyzing: {microsim_dir.name}")
        data = analyze_microsim(microsim_dir)
        microsims.append(data)

    # Generate report
    generate_report(microsims, output_path)

    # Print summary
    avg_score = sum(m['score'] for m in microsims) / len(microsims) if microsims else 0
    print(f"\nSummary:")
    print(f"  Total MicroSims: {len(microsims)}")
    print(f"  Average Score: {avg_score:.0f}/100")
    print(f"  Scores 80+: {sum(1 for m in microsims if m['score'] >= 80)}")
    print(f"  Scores below 60: {sum(1 for m in microsims if m['score'] < 60)}")

    return 0


if __name__ == '__main__':
    exit(main())
