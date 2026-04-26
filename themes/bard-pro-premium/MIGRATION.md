# Bard Pro — migration notes

This theme was scaffolded by `wp2static`. It is a starting point,
not a drop-in replacement for the WordPress theme.

## Dropped on purpose

- `functions.php` — WordPress runtime hooks / action filters.
- Theme-specific option panels (Customizer / Redux / Kirki).
- Widget areas and dynamic_sidebar calls.
- Freemius / plugin bundles shipped inside the theme.

## PHP calls that couldn't be translated

### `404.php`

- `esc_html_e( 'It seems we can\'t find what you\'re looking for. Perhaps searching can help or go back to ', 'bard-pro' );`

### `comments.php`

- `// prevent the direct loading of this file`
- `comments_number( esc_html__( 'No Comments', 'bard-pro' ), esc_html__( 'One Comment', 'bard-pro' ), esc_html__( '% Comments', 'bard-pro' ) );`
- `wp_list_comments( 'callback=bard_comments' );`
- `if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :`
- `previous_comments_link( '<i class="fa fa-long-arrow-alt-left" ></i>&nbsp;'. esc_html__( 'Older Comments', 'bard-pro' ) );`
- `next_comments_link( esc_html__( 'Newer Comments', 'bard-pro' ) .'&nbsp;<i class="fa fa-long-arrow-alt-right" ></i>' );`
- `endif;`

### `footer.php`

- `echo bard_options( 'general_footer_width' ) === 'boxed' ? 'boxed-wrapper ': '';`
- `// Instagram Widget`
- `if ( bard_options( 'page_footer_logo' ) != '' || bard_options( 'page_footer_copyright' ) != '' || bard_options('page_footer_show_scrolltop') === true ) :`
- `echo bard_options( 'general_footer_width' ) === 'contained' ? 'boxed-wrapper': '';`
- `if ( bard_options( 'page_footer_logo' ) != '' ) :`
- `echo esc_url( wp_get_attachment_url( bard_options( 'page_footer_logo' ) ) );`
- `$copyright = bard_options( 'page_footer_copyright' );`
- `wp_nav_menu( array(`
- `if ( bard_options('page_footer_show_scrolltop') === true ) :`
- `endif`

### `header.php`

- `echo bard_options( 'general_header_width' ) === 'boxed' ? 'class="boxed-wrapper"': '';`
- `// Instagram Widget`

### `templates/grid/blog-classic.php`

- `post_class( 'blog-post' );`
- `if ( bard_options( 'blog_page_post_header_position' ) === 'below' ) :`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `if ( bard_options( 'blog_page_show_categories' ) === true ) :`
- `the_category( ',&nbsp;&nbsp;' );`
- `if ( get_the_title() ) :`
- `if ( bard_options( 'blog_page_show_date' ) === true || bard_options( 'blog_page_show_comments' ) === true ):`
- `if ( bard_options( 'blog_page_show_date' ) === true ) :`
- `the_time( get_option( 'date_format' ) );`
- `if ( bard_options( 'blog_page_show_comments' ) === true && comments_open() ) {`
- `if ( bard_options( 'blog_page_post_header_position' ) === 'above' ) :`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `if ( bard_options( 'blog_page_post_description' ) !== 'none' ) :`
- `if ( bard_options( 'blog_page_post_description' ) === 'content' ) {`
- `if ( bard_options( 'blog_page_show_read_more' ) === true ) :`
- `echo esc_html( bard_options( 'blog_page_more_text' ) );`
- `if ( bard_options( 'blog_page_show_author' ) === true ) :`
- `echo '<a href="'. esc_url(get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) )) .'">';`
- `bard_post_sharing();`
- `if ( bard_options( 'blog_page_related_orderby' ) !== 'none' ) {`

### `templates/grid/blog-full.php`

- `$full_width_post = ( is_home() && ! is_paged() && $wp_query->current_post == 0 && bard_full_width_post() ) ? 'yes' : 'no';`
- `post_class( 'blog-post' );`
- `echo $full_width_post;`
- `if ( bard_options( 'blog_page_show_categories' ) === true ) :`
- `the_category( ',&nbsp;&nbsp;' );`
- `if ( get_the_title() ) :`
- `if ( bard_options( 'single_page_show_date' ) === true || bard_options( 'single_page_show_comments' ) === true ):`
- `if ( bard_options( 'single_page_show_date' ) === true ) :`
- `the_time( get_option( 'date_format' ) );`
- `if ( bard_options( 'single_page_show_comments' ) === true && comments_open() ) {`
- `if ( bard_options( 'blog_page_post_description' ) !== 'none' ) :`
- `if ( bard_options( 'blog_page_post_description' ) === 'content' ) {`
- `echo esc_html( bard_options( 'blog_page_more_text' ) );`
- `if ( bard_options( 'blog_page_show_author' ) === true ) :`
- `echo '<a href="'. esc_url(get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) )) .'">';`
- `bard_post_sharing();`
- `if ( bard_options( 'blog_page_related_orderby' ) !== 'none' ) {`

### `templates/grid/blog-grid.php`

- `post_class('blog-post clear-fix');`
- `if ( bard_options( 'blog_page_post_header_position' ) === 'below' ) :`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `$category_list = get_the_category_list( ',&nbsp;&nbsp;' );`
- `if ( get_the_title() ) :`
- `if ( bard_options( 'blog_page_show_date' ) || bard_options( 'blog_page_show_comments' ) ):`
- `if ( bard_options( 'blog_page_show_date' ) === true ) :`
- `the_time( get_option( 'date_format' ) );`
- `if ( bard_options( 'blog_page_show_comments' ) === true && comments_open() ) {`
- `if ( bard_options( 'blog_page_post_header_position' ) === 'above' ) :`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `if ( bard_options( 'blog_page_post_description' ) !== 'none' ) :`
- `if ( bard_options( 'blog_page_post_description' ) === 'content' ) {`
- `if ( bard_options( 'blog_page_show_read_more' ) === true ) :`
- `echo esc_html( bard_options( 'blog_page_more_text' ) );`
- `$post_footer_elements = array(`
- `if ( bard_options( 'blog_page_show_author' ) === true ) :`
- `the_author_posts_link();`
- `bard_post_sharing();`
- `if ( strpos( bard_page_layout(), 'col1' ) === 0 && bard_options( 'blog_page_related_orderby' ) !== 'none' ) {`

### `templates/grid/blog-list.php`

- `post_class('blog-post clear-fix');`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `$category_list = get_the_category_list( ',&nbsp;&nbsp;' );`
- `if ( get_the_title() ) :`
- `if ( bard_options( 'blog_page_show_date' ) || bard_options( 'blog_page_show_comments' ) || bard_options( 'blog_page_show_author' ) ) :`
- `if ( bard_options( 'blog_page_show_author' ) === true ) :`
- `the_author_posts_link();`
- `if ( bard_options( 'blog_page_show_date' ) === true ) :`
- `the_time( get_option( 'date_format' ) );`
- `if (  bard_options( 'blog_page_show_comments' ) === true && comments_open() ) :`
- `comments_popup_link( esc_html__( 'No Comments', 'bard-pro' ), esc_html__( '1 Comment', 'bard-pro' ), '% '. esc_html__( 'Comments', 'bard-pro' ), 'post-comments');`
- `if ( bard_options( 'blog_page_post_description' ) !== 'none' ) :`
- `if ( bard_options( 'blog_page_post_description' ) === 'content' ) {`
- `if ( bard_options( 'blog_page_show_read_more' ) === true ) :`
- `echo esc_html( bard_options( 'blog_page_more_text' ) );`
- `bard_post_sharing();`
- `if ( bard_options( 'blog_page_related_orderby' ) !== 'none' ) {`

### `templates/grid/blog-pagination.php`

- `global $paged;`
- `echo esc_attr__( $post_pagination );`
- `echo esc_attr( $wp_query->max_num_pages );`
- `// Numeric Pagination`

### `templates/header/featured-links.php`

- `// Check for WooCommerce`
- `echo bard_options( 'general_links_width' ) === 'boxed' ? ' boxed-wrapper': '';`
- `if ( bard_options( 'featured_links_image_1' ) !== '' && wp_get_attachment_url( bard_options( 'featured_links_image_1' ) ) != false ):`
- `echo esc_url( wp_get_attachment_url( bard_options( 'featured_links_image_1' ) ) );`
- `echo esc_url( bard_options( 'featured_links_url_1' ) );`
- `echo esc_attr($links_window);`
- `echo esc_attr( bard_options( 'featured_links_title_1' ) );`
- `if ( bard_options( 'featured_links_image_2' ) !== '' && wp_get_attachment_url( bard_options( 'featured_links_image_2' ) ) != false ):`
- `echo esc_url( wp_get_attachment_url( bard_options( 'featured_links_image_2' ) ) );`
- `echo esc_url( bard_options( 'featured_links_url_2' ) );`
- `echo esc_attr($links_window);`
- `echo esc_attr( bard_options( 'featured_links_title_2' ) );`
- `if ( bard_options( 'featured_links_image_3' ) !== '' && wp_get_attachment_url( bard_options( 'featured_links_image_3' ) ) != false ):`
- `echo esc_url( wp_get_attachment_url( bard_options( 'featured_links_image_3' ) ) );`
- `echo esc_url( bard_options( 'featured_links_url_3' ) );`
- `echo esc_attr($links_window);`
- `echo esc_attr( bard_options( 'featured_links_title_3' ) );`
- `if ( bard_options( 'featured_links_image_4' ) !== '' && wp_get_attachment_url( bard_options( 'featured_links_image_4' ) ) != false ):`
- `echo esc_url( wp_get_attachment_url( bard_options( 'featured_links_image_4' ) ) );`
- `echo esc_url( bard_options( 'featured_links_url_4' ) );`
- `echo esc_attr($links_window);`
- `echo esc_attr( bard_options( 'featured_links_title_4' ) );`
- `if ( bard_options( 'featured_links_image_5' ) !== '' && wp_get_attachment_url( bard_options( 'featured_links_image_5' ) ) != false ):`
- `echo esc_url( wp_get_attachment_url( bard_options( 'featured_links_image_5' ) ) );`
- `echo esc_url( bard_options( 'featured_links_url_5' ) );`
- `echo esc_attr($links_window);`
- `echo esc_attr( bard_options( 'featured_links_title_5' ) );`

### `templates/header/featured-slider.php`

- `// Check for WooCommerce`
- `echo bard_options( 'general_slider_width' ) === 'boxed' ? ' boxed-wrapper': '';`
- `echo bard_options( 'general_slider_width' ) === 'boxed' ? 'boxed-wrapper': '';`
- `echo esc_attr( $slider_columns );`
- `echo esc_attr( $slider_data );`
- `// Query Args`
- `if ( $slider_columns === 1 ) :`
- `echo the_post_thumbnail_url();`
- `the_post_thumbnail_url('bard-slider-thumbnail');`
- `if ( bard_options( 'featured_slider_more' ) === false && bard_options( 'featured_slider_title' ) === false ) {`
- `$category_list = get_the_category_list( ', ' );`
- `if ( bard_options( 'featured_slider_categories' ) === true && $category_list ) :`
- `echo '' . $category_list;`
- `if( bard_options( 'featured_slider_title' ) === true ) :`
- `if ( bard_options( 'featured_slider_excerpt' )  > 0 ):`
- `bard_excerpt( bard_options( 'featured_slider_excerpt' ) );`
- `if ( bard_options( 'featured_slider_more' ) === true ) :`
- `if( bard_options( 'featured_slider_date' ) === true ) :`
- `the_time( get_option('date_format') );`
- `endwhile; // Loop end`

### `templates/header/main-navigation.php`

- `if ( bard_options( 'main_nav_label' ) === true ) :`
- `echo bard_options( 'main_nav_fixed' );`
- `echo bard_options( 'general_header_width' ) === 'contained' ? 'class="boxed-wrapper"': '';`
- `if ( bard_options( 'main_nav_show_sidebar' ) === true ) :`
- `if ( bard_options( 'main_nav_show_random_btn' ) === true ) :`
- `bard_random_post_button();`
- `if ( bard_options( 'main_nav_show_socials' ) === true ) :`
- `if ( bard_options( 'main_nav_show_socials' ) === true ) {`
- `if ( bard_options( 'main_nav_show_search' ) === true ) :`
- `// Navigation Menus`
- `$mobile_menu_location = 'main';`

### `templates/header/page-header.php`

- `if ( bard_options('header_image_label') === true ) :`
- `echo bard_options( 'header_image_bg_type' );`
- `echo $header_image_attr;`
- `echo bard_options( 'header_image_video_mp4' );`
- `echo bard_options( 'header_image_video_webm' );`
- `if ( $header_logo !== 'no' ) :`
- `if ( has_custom_logo() ) :`
- `echo esc_url( $custom_logo );`
- `echo bloginfo( 'title' );`
- `// Social Icons`
- `// Slider`

### `templates/header/preloader.php`

- `// Preloader HTML Codes`
- `if ( bard_options( 'preloader_type' ) === 'logo' ) :`
- `echo $custom_logo[0];`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_1' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_2' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_3' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_4' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_5' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_6' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_7' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_8' ) :`
- `elseif ( bard_options( 'preloader_type' ) === 'animation_9' ) :`

### `templates/header/top-bar.php`

- `if ( bard_options( 'top_bar_label' ) === true ) :`
- `echo bard_options( 'general_header_width' ) === 'contained' ? 'class="boxed-wrapper"': '';`
- `// Social Icons`
- `// Mobile Menu`

### `templates/post/content-audio.php`

- `bard_post_thumbnail();`
- `echo get_field( 'audio_embed_code' );`

### `templates/post/content-gallery.php`

- `$images = get_field('select_gallery_images');`
- `echo wp_get_attachment_image( $image['ID'],'bard-full-thumbnail' );`
- `if ( $image['caption'] ):`
- `echo $image['caption'];`
- `endforeach;`
- `foreach ( $images as $image ) :`
- `if ( strpos( bard_page_layout(), 'col1' ) === 0 || is_single() ) {`
- `endforeach;`

### `templates/post/content-link.php`

- `bard_post_thumbnail();`
- `echo esc_url( get_field( 'link_url' ) );`
- `echo get_field( 'link_title' );`

### `templates/post/content-quote.php`

- `bard_post_thumbnail();`
- `echo get_field( 'quote_text' );`
- `echo get_field( 'quote_author' );`

### `templates/post/content-video.php`

- `// Video Embed Code`

### `templates/post/content.php`

- `if( is_single() && get_field( 'hide_featured_image' ) === 'yes' ) {`

### `templates/sidebars/footer-widgets.php`

- `if ( ! is_active_sidebar( 'footer-widgets' ) ) {`
- `echo bard_options( 'general_footer_width' ) === 'contained' ? 'boxed-wrapper': '';`
- `dynamic_sidebar( 'footer-widgets' );`

### `templates/sidebars/instagram-widget.php`

- `if ( ! is_active_sidebar( 'instagram-widget' ) ) {`
- `dynamic_sidebar( 'instagram-widget' );`

### `templates/sidebars/sidebar-alt.php`

- `// check if available`
- `if ( ! is_active_sidebar( 'sidebar-alt' ) ) {`

### `templates/sidebars/sidebar-left.php`

- `// get layout`
- `dynamic_sidebar( 'sidebar-left' );`

### `templates/sidebars/sidebar-right.php`

- `// get layout`
- `dynamic_sidebar( 'sidebar-right' );`

### `templates/sidebars/sidebar-shop-left.php`

- `// get layout`
- `dynamic_sidebar( 'sidebar-shop-left' );`

### `templates/sidebars/sidebar-shop-right.php`

- `// get layout`
- `dynamic_sidebar( 'sidebar-shop-right' );`

### `templates/single/author-description.php`

- `$authordesc = get_the_author_meta( 'description' );`
- `echo get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) );`
- `echo get_avatar( get_the_author_meta( 'ID' ), 95 );`
- `the_author_posts_link();`
- `the_author_meta( 'description' );`
- `if( get_the_author_meta( 'facebook' ) ) :`
- `echo the_author_meta( 'facebook' );`
- `if( get_the_author_meta( 'twitter' ) ) :`
- `echo the_author_meta( 'twitter' );`
- `if( get_the_author_meta( 'instagram' ) ) :`
- `echo the_author_meta( 'instagram' );`
- `if( get_the_author_meta( 'pinterest' ) ) :`
- `echo the_author_meta( 'pinterest' );`
- `if( get_the_author_meta( 'bloglovin' ) ) :`
- `echo the_author_meta( 'bloglovin' );`
- `if( get_the_author_meta( 'google_plus' ) ) :`
- `echo the_author_meta( 'google_plus' );`
- `if( get_the_author_meta( 'tumblr' ) ) :`
- `echo the_author_meta( 'tumblr' );`
- `if( get_the_author_meta( 'youtube' ) ) :`
- `echo the_author_meta( 'youtube' );`
- `if( get_the_author_meta( 'vine' ) ) :`
- `echo the_author_meta( 'vine' );`
- `if( get_the_author_meta( 'flickr' ) ) :`
- `echo the_author_meta( 'flickr' );`
- `if( get_the_author_meta( 'linkedin' ) ) :`
- `echo the_author_meta( 'linkedin' );`
- `if( get_the_author_meta( 'behance' ) ) :`
- `echo the_author_meta( 'behance' );`
- `if( get_the_author_meta( 'soundcloud' ) ) :`
- `echo the_author_meta( 'soundcloud' );`
- `if( get_the_author_meta( 'vimeo' ) ) :`
- `echo the_author_meta( 'vimeo' );`
- `if( get_the_author_meta( 'rss' ) ) :`
- `echo the_author_meta( 'rss' );`
- `if( get_the_author_meta( 'dribbble' ) ) :`
- `echo the_author_meta( 'dribbble' );`
- `if( get_the_author_meta( 'envelope' ) ) :`
- `echo the_author_meta( 'envelope' );`

### `templates/single/comments-area.php`

- `// If comments are open or we have at least one comment, load up the comment template.`

### `templates/single/post-content.php`

- `if ( have_posts() ) :`
- `get_template_part( 'templates/post/content', get_post_format() );`
- `$category_list = get_the_category_list( ',&nbsp;&nbsp;' );`
- `if ( get_the_title() ) :`
- `if ( bard_options( 'single_page_show_date' ) || bard_options( 'single_page_show_comments' ) ) :`
- `if ( bard_options( 'single_page_show_date' ) === true ) :`
- `the_time( get_option( 'date_format' ) );`
- `if ( bard_options( 'single_page_show_comments' ) === true && comments_open() ) {`
- `// The Post Content`
- `// The Tags`
- `if ( bard_options( 'single_page_show_author' ) === true ) :`
- `the_author_posts_link();`
- `bard_post_sharing();`
- `endwhile; // Loop End`

### `templates/single/single-navigation.php`

- `// Get Previous and Next Posts`
- `if ( ! empty( $prev_post ) ) :`
- `echo esc_url( get_permalink($prev_post->ID) );`
- `echo esc_attr($prev_post->post_title);`
- `echo esc_url( get_permalink( $prev_post->ID ) );`
- `echo esc_attr($prev_post->post_title);`
- `echo esc_attr( $prev_post->post_title );`
- `if ( ! empty( $next_post ) ) :`
- `echo esc_url( get_permalink($next_post->ID) );`
- `echo esc_attr($next_post->post_title);`
- `echo esc_url( get_permalink( $next_post->ID ) );`
- `echo esc_attr($next_post->post_title);`
- `echo esc_attr( $next_post->post_title );`


Search the generated templates for `wp2static unmapped` to find each occurrence in context.
